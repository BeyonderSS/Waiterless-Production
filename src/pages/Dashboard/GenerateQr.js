import Bill from "@/components/Bill";
import GenerateQR from "@/components/GenerateQR";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import { useExpiry } from "@/context/ExpiryContext";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const GenerateQr = () => {
  const { user, restaurantId, role, signInWithGoogle } = useAuth();
  const { expiry } = useExpiry();
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
    <div className="">
      <div className="md:pt-20">
        {expiry == true && role == "Admin" && <Bill />}
      </div>
      {role == "Admin" && expiry == false && <GenerateQR />}
      {!user ? (
        <div className="flex flex-col items-center min-h-screen pt-24 bg-white pb-8">
          Please Login First
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer text-xl text-white p-1 px-14 bg-orange-500 rounded-full"
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

export default GenerateQr;
