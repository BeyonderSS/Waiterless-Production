import AdminOrders from "@/components/AdminOrders";
import Bill from "@/components/Bill";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import { useExpiry } from "@/context/ExpiryContext";
import useOrders from "@/utils/useOrders";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const OrdersDashboard = () => {
  const orders = useOrders();
  const { user, restaurantId, role, signInWithGoogle } = useAuth();
  const {expiry} = useExpiry()
  const [loading, setLoading] = useState(true); // State variable for loading status
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer when component unmounts
  }, []);
  if (loading) {
    // Show loader while loading is true
    return (
      <div className="flex justify-center items-center min-h-screen pt-24 md:pl-80 bg-white pb-8">
        <PropagateLoader color="#4ADE80" loading={loading} />
      </div>
    );
  }



  
  return (
    <div>
      <div className="md:pt-20">

      {expiry == true && role == "Admin" && <Bill />}
      </div>
      {role == "Admin" && expiry==false &&<AdminOrders orders={orders} />}
      {!user ? (
        <div className="flex flex-col items-center min-h-screen pt-24 bg-white pb-8">
          Please Login First
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer text-xl text-white p-1 px-14 bg-green-500 rounded-full"
          >
            Login
          </button>
        </div>
      ) : role !== "Admin" ? (
        <NotAuth />
      ) : null}
    </div>
  );
};

export default OrdersDashboard;
