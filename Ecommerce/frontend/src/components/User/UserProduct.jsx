import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Empty from '../common/Empty';
import Loader from '../common/Loader';
import { apiUrl, UserToken } from '../common/Http';

function UserProduct() {
    const [product, setProduct] = useState([])
    const [loader, setLoader] = useState(false)
    const fetchProduct = async () => {
        setLoader(true)
        const res = await fetch(`${apiUrl}/purchaseproduct`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${UserToken()}`

            },
        })
        setLoader(false)
        const result = await res.json();

        console.log("API Show Result:", result.data);
        console.log("Token-Show:", UserToken());
        if (result.status == 200) {

            setProduct(result.data)

        } else {
            console.log("Something went wrong!")
            toast.error(result.error)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <div >
            <Layout>
                <div className='md:container md:mx-auto px-6 py-5 my-5'>
                    <h2 className='my-2 text-base md:text-2xl'>Purchase-Product</h2>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full md:w-1/4">
                            <Sidebar />
                        </div>
                        <div className="w-full md:w-3/4">
                            <div className="shadow-lg bproduct-2 bproduct-gray-200 p-4 rounded-lg">
                                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
                                    {
                                        loader == true && <Loader />
                                    }
                                    {
                                        !loader && !product && <Empty text="product Not Found!" />}
                                    {
                                        product && product.length > 0 &&
                                        <div>

                                            <table className="w-full text-sm text-left rtl:text-right text-body">
                                                <thead className="bg-neutral-secondary-soft bproduct-b bproduct-gray-300">
                                                    <tr
                                                        className="odd:bg-neutral-primary even:bg-neutral-secondary-soft hover:bg-gray-100 transition"
                                                    >
                                                        <th scope="col" className="px-6 py-3 font-medium">
                                                            #
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium">
                                                            Customer
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium text-center">
                                                            Amount
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium text-center">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium text-center">
                                                            Payment
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 font-medium text-center">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        product.map((product, index) => (

                                                            <tr
                                                                key={index}
                                                                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft hover:bg-gray-100  transition"
                                                            >
                                                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                                    <Link to={`/myproduct/${product.id}`}
                                                                    >
                                                                        {product.id}
                                                                    </Link>
                                                                </th>
                                                                <td className="px-6 py-4">
                                                                    {product.user?.name}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {product.user?.email}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    RS {product.grand_total}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {new Date(product.created_at).toISOString().split("T")[0]}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {product.payment_status == 'paid' ?
                                                                        <span className='text-white bg-green-700 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>Paid</span>
                                                                        :
                                                                        <span className='text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>UnPaid</span>
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {product.status == 'pending'
                                                                        &&
                                                                        <span className='text-white bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>Pending</span>
                                                                    }
                                                                    {product.status == 'delivered'
                                                                        &&
                                                                        <span className='text-white bg-green-700 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>Delivered</span>
                                                                    }
                                                                    {product.status == 'shipped'
                                                                        &&
                                                                        <span className='text-white bg-red-700 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>Shipped</span>
                                                                    }
                                                                    {product.status == 'cancelled'
                                                                        &&
                                                                        <span className='text-white bg-gray-700 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center leading-5'>Cancelled</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UserProduct