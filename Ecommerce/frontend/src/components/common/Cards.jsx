import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from './Http';
import striptags from "striptags";



function Cards() {
    const [newProducts, setNewProduct] = useState([]);
 

    // newarrivals
    const newArrivals = async () => {
        try {
            const res = await fetch(`${apiUrl}/latestProduct`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
            });
            const result = await res.json();
            if (result.status === 200)
                setNewProduct(result.data);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Something Went Wrong!");
        }
    };


    useEffect(() => {
        newArrivals();

    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((newproduct) => (
                <div
                    key={newproduct.id}
                    className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full max-w-sm mx-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
                >
                    <div className="relative overflow-hidden rounded-t-lg">
                        <Link to={`/product/${newproduct.id}`}>
                            <img
                                src={newproduct.image_url}
                                alt={newproduct.title}
                                className="h-60 w-full object-cover"
                            />
                        </Link>
                    </div>

                    <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-slate-800 text-lg font-semibold">
                                {newproduct.title}
                            </p>
                            <p className="text-cyan-600 text-lg font-semibold">
                                ${newproduct.price}
                            </p>
                        </div>

                        <p className="text-slate-600 text-sm leading-normal font-light">
                            {striptags(newproduct.description)}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards