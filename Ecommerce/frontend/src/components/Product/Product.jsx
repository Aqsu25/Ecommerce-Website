import React, { useContext, useEffect, useState } from 'react'
import Layout from '../common/Layout'
import { Link, useParams } from 'react-router'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StarRating from '../common/StarRating';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { CartContext } from '../context/Cart';
import striptags from "striptags";

function Product() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [activeTab, setActiveTab] = useState("");
    const { addToCart } = useContext(CartContext);





    const { id } = useParams();
    // fetchcategory
    const fetchProduct = async () => {
        try {
            const res = await fetch(`${apiUrl}/getProduct/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
            });
            const result = await res.json();
            if (result.status === 200) {
                console.log(result)
                setProduct(result.data);

                console.log("Url-IMG", result.data.image_url)

                setProductImages(result.data.product_images)
                console.log("PRODUCT-IMG", result.data.product_images)

                setProductSizes(result.data.product_sizes)
            }

        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Something Went Wrong!");
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (!product) {
        return (
            <Layout>
                <div className="text-center py-20 text-xl font-semibold">
                    Loading Product...
                </div>
            </Layout>
        );
    }

    const handleCart = () => {
        if (productSizes.length > 0 && !sizeSelected) {
            toast.error("Please Select Size !");
            return;
        }
        else {
            const selectedSize = productSizes.length > 0 ? sizeSelected : null;
            addToCart(product, selectedSize);
            toast.success("Product Successfully Add To Cart!");
        }

    }

    return (
        <Layout>
            <div className='container mx-auto px-2 md:px-4 py-2 mb-5'>
                <nav aria-label="breadcrumb" className="w-max my-4">
                    <ol className="flex flex-wrap items-center rounded-md px-4 py-2">
                        <li className="flex items-center text-sm text-slate-500 hover:text-[#007595]">
                            <Link to="/" className='text-black hover:text-[#007595]'>Home</Link>
                            <span className="pointer-events-none mx-2 text-black">/</span>
                        </li>
                        <li className="flex items-center text-sm text-slate-500 hover:text-[#007595]">
                            <Link to="/shop" className='text-black hover:text-[#007595]'>Shop</Link>
                            <span className="pointer-events-none mx-2 text-black">/</span>
                        </li>
                        <li className="flex items-center text-sm text-slate-500 hover:text-[#007595]">
                            {product?.title}
                        </li>
                    </ol>
                </nav>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className="w-full md:w-2/5">
                        <div className="bg-white rounded-2xl shadow-xl p-3">
                            <Swiper
                                spaceBetween={10}
                                navigation
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="rounded-xl mb-4"
                            >
                                {productImages.length > 0 &&
                                    (
                                        productImages.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={img?.image_url}
                                                    alt="Img-single"
                                                    className="w-full h-[420px] object-cover rounded-xl"
                                                />
                                            </SwiperSlide>
                                        ))
                                    )
                                }
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={12}
                                slidesPerView={4}
                                freeMode
                                watchSlidesProgress
                                modules={[FreeMode, Thumbs]}
                                className="cursor-pointer"
                            >

                                {productImages.length > 0 &&
                                    (
                                        productImages.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={img?.image_url}
                                                    alt="Img-pro"
                                                    className="h-24 w-full object-cover rounded-lg border hover:border-[#007595] transition"
                                                />
                                            </SwiperSlide>
                                        ))
                                    )
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className='w-full md:w-3/5 rounded-2xl ms-7 px-5'>
                        <h1 className='text-4xl font-bold'> {product?.title}</h1>
                        <div className="flex gap-2 py-3">
                            <StarRating /><span className='text-red-400'>10 Reviews</span>
                        </div>
                        {/* price */}
                        <div className='text-2xl pb-3'>
                            ${product?.price}
                            <span className='text-gray-400 ps-3'>
                                ${product?.compare_price}
                            </span>
                        </div>
                        {/* description */}
                        <div>
                            {product?.short_description}
                        </div>
                        {/* sizes */}
                        {productSizes.length > 0 && (
                            <div className="mt-6 pb-3">
                                <h3 className="text-2xl font-bold text-slate-900">Sizes</h3>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {productSizes.map((size) => (
                                        <button
                                            key={size.id}
                                            onClick={() => setSizeSelected(size.name)}
                                            className={`rounded-sm w-12 h-11 cursor-pointer 
            ${sizeSelected === size.name ? 'bg-[#007595] text-white' : 'bg-gray-200 hover:bg-gray-300'} 
            flex items-center justify-center shrink-0`}
                                        >
                                            {size.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* addtocrat */}
                        <button
                            onClick={() => handleCart()}
                            className="bg-[#007595] mt-3 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded inline-flex items-center">
                            <FontAwesomeIcon icon={faShoppingCart} className='
                            pe-2' />
                            <span>Add To Cart</span>
                        </button>
                        <hr className='text-gray-200 py-3 mt-5' />
                        <div className='flex'>
                            <h3 className="text-2xl font-bold text-black">SKU:
                                <span className='text-gray-900 px-3'> {product?.sku}</span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <ul className="flex border-b border-gray-500 mt-5">

                        <li className="-mb-px mr-1">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`inline-block py-2 px-4 font-semibold ${activeTab === "description"
                                    ? "border-b-2 border-[#007595] text-[#007595]"
                                    : "text-gray-600"
                                    }`}
                            >
                                Description
                            </button>
                        </li>

                        <li className="mr-1">
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`inline-block py-2 px-4 font-semibold ${activeTab === "reviews"
                                    ? "border-b-2 border-[#007595] text-[#007595]"
                                    : "text-gray-600"
                                    }`}
                            >
                                Reviews (10)
                            </button>
                        </li>

                    </ul>


                    <div className="mt-4">
                        {activeTab === "description" && (
                            <div>

                                {striptags(product?.description)}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div>
                                <p>Reviews section yahan show hoga.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>)
}
export default Product




