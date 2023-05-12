import AdminOrders from "@/components/AdminOrders";
import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import useOrders from "@/utils/useOrders";
import React from "react";

const OrdersDashboard = () => {
  const orders = useOrders();
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();

  return (
    <div>
      {role == "Admin" && <AdminOrders orders={orders} />}
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

export default OrdersDashboard;
