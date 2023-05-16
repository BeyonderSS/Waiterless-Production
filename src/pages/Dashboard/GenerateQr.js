import GenerateQR from "@/components/GenerateQR";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const GenerateQr = () => {
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();

  return (
    <div className="">
      {role == "Admin" && <GenerateQR />}
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
