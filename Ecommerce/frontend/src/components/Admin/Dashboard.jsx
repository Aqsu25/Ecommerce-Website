
import { Link } from 'react-router-dom';
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar';

function Dashboard() {

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
                                        <span >1</span>
                                        <h2 >Users</h2>

                                    </div>
                                    <div className='bg-gray-100 text-center py-2 border-t border-gray-300'>
                                        <Link to="">View Users</Link>
                                    </div>
                                </div>
                                <div className='shadow-lg rounded-lg border-2 border-gray-200'>
                                    <div className='p-4 text-sm md:text-2xl'>
                                        <span >1</span>
                                        <h2 >Products</h2>

                                    </div>
                                    <div className='bg-gray-100 py-2 text-center border-t border-gray-300'>
                                        <Link to="/products">View Products</Link>
                                    </div>
                                </div>
                                <div className='shadow-lg rounded-lg border-2 border-gray-200'>
                                    <div className='p-4 text-sm md:text-2xl'>
                                        <span >1</span>
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