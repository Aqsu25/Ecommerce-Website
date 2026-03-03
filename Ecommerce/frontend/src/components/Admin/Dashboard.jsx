import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar';
import { adminToken, apiUrl } from '../common/Http';

function Dashboard() {
    const [counts, setCounts] = useState({
        users: 0,
        products: 0,
        orders: 0,
    })

    //   counts
    const countData = async () => {
        const res = await fetch(`${apiUrl}/dashboard-count`, {
            method: "GET",
            headers: {

                "Authorization": `Bearer ${adminToken()}`
            },
        })
        const result = await res.json();
        console.log("API Show Result:", result);
        if (result.status == 200) {
            setCounts({
                users: result.users,
                products: result.products,
                orders: result.orders
            });
        } else {
            console.log("Something went wrong!")
        }
    }

    useEffect(() => {
        countData()
    }, [])

    return (
        <div >
            <Layout>
                <div className='md:container md:mx-auto px-6 py-5 my-5'>
                    <h2 className='my-2 text-base md:text-2xl'>Dashboard</h2>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full md:w-1/4">
                            <Sidebar />
                        </div>
                        <div className="w-full md:w-3/4">
                            <div className="grid md:grid-cols-3 gap-5">
                                <div className='shadow-lg rounded-lg border-2 border-gray-200'>
                                    <div className='p-4 text-sm md:text-2xl'>
                                        <span >{counts.users}</span>
                                        <h2 >Users</h2>

                                    </div>
                                    <div className='bg-gray-100 text-center py-2 border-t border-gray-300'>
                                        <Link to="/admin/users">View Users</Link>
                                    </div>
                                </div>
                                <div className='shadow-lg rounded-lg border-2 border-gray-200'>
                                    <div className='p-4 text-sm md:text-2xl'>
                                        <span >{counts.products}</span>
                                        <h2 >Products</h2>

                                    </div>
                                    <div className='bg-gray-100 py-2 text-center border-t border-gray-300'>
                                        <Link to="/products">View Products</Link>
                                    </div>
                                </div>
                                <div className='shadow-lg rounded-lg border-2 border-gray-200'>
                                    <div className='p-4 text-sm md:text-2xl'>
                                        <span >{counts.orders}</span>
                                        <h2 >Orders</h2>

                                    </div>
                                    <div className='bg-gray-100 text-center py-2 border-t border-gray-300'>
                                        <Link to="/admin/orders">View Orders</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Dashboard