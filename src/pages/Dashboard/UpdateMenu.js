import React from "react";
import UpdateItems from "@/components/UpdateItems";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import { useExpiry } from "@/context/ExpiryContext";
import Bill from "@/components/Bill";

const UpdateMenu = () => {
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();
  const {expiry} = useExpiry()
  return (
    <div>

      {expiry == true && role == "Admin" && <Bill />}
    <div className="h-screen pt-24">
      {role == "Admin" && expiry==false &&<UpdateItems />}
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
) : (
  role !== "Admin" ? (
    <NotAuth/>
  ) : null
  )}

    </div>
  </div>
  );
};

export default UpdateMenu;
