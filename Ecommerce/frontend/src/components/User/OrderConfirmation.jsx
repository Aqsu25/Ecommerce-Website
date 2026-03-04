import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl, UserToken } from "../common/Http";
import Layout from "../common/Layout";
import { motion } from "framer-motion";


function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/order/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${UserToken()}`,
          },
        });
        const result = await res.json();
        setLoading(false);

        if (res.ok && result.data) {
          setOrder(result.data.order);
          setOrderItems(result.data.items);
        } else {
          toast.error("Order not found!");
        }
      } catch (error) {
        
        console.error(error);
      }
    };

    // fetchprofiledata
    const fetchProfileData = async () => {
      try {
        const res = await fetch(`${apiUrl}/myaccount`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            Authorization: `Bearer ${UserToken()}`
          },
        });

        const result = await res.json();
        console.log("API Response:", result);

        if (result.status === 200 && result.data) {
          setProfile(result.data)
        }

      } catch (error) {
        console.error("Fetch error:", error);
      
      }
    };

    fetchOrder();
    fetchProfileData();
  }, [id]);

 if (!order && !loading)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">

  
      <div className="absolute inset-0 bg-gradient-to-br from-[#007595]/10 to-blue-100 blur-2xl opacity-40"></div>

    
      <div className="relative bg-white px-12 py-10 rounded-2xl shadow-2xl text-center w-[420px] animate-fadeIn">

      
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-[#007595]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#007595] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

     
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading Order Details
        </h2>

        <p className="text-gray-500 text-sm">
          Please wait while we fetch the order information...
        </p>

      
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 bg-[#007595] rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-[#007595] rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-[#007595] rounded-full animate-bounce delay-300"></span>
        </div>

      </div>
    </div>
  );

return (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#f3eae3] flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >

        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-10 flex flex-col justify-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Thank you for your purchase!
          </h1>

          <p className="text-gray-600 mb-8">
            Your order will be processed within 24 hours during working days.
            We will notify you by email once your order has been shipped.
          </p>

          <div className="mb-6 space-y-2 text-gray-700 text-sm">
            <h3 className="font-semibold text-lg mb-4">Billing address</h3>
            <p><strong>Name:</strong> {order?.user?.name}</p>
            <p><strong>Address:</strong> {profile?.city}, {profile?.state}</p>
            <p><strong>Phone:</strong> {profile?.phone_num}</p>
            <p><strong>Email:</strong> {order?.user?.email}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-6 py-3 rounded-full w-fit shadow-lg hover:bg-orange-600 transition-all duration-300"
          >
            Track Your Order
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-50 p-10 relative"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">
            {orderItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 border-b pb-4 transition-all duration-300"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={item.product?.image_url}
                  alt={item.product?.title}
                  className="w-16 h-16 object-cover rounded-md shadow-md"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {item.product?.title}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="font-semibold text-sm">
                  Rs. {item.price}
                </p>
              </motion.div>
            ))}
          </div>

          {/* TOTAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 space-y-3 text-sm text-gray-700"
          >
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {order?.sub_total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. {order?.shipping}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>- Rs. {order?.discount}</span>
            </div>

            <div className="flex justify-between font-bold text-base border-t pt-4">
              <span>Order Total</span>
              <span>Rs. {order?.grand_total}</span>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.div>
  </Layout>
);
}

export default OrderConfirmation;