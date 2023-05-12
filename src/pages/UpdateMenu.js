import React from "react";
import UpdateItems from "@/components/UpdateItems";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";

const UpdateMenu = () => {
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();

  return (
    <div className="h-screen pt-24">{role == "Admin" && <UpdateItems />}
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
) : (
  role !== "Admin" ? (
    <NotAuth/>
  ) : null
)}

    </div>
  );
};

export default UpdateMenu;
