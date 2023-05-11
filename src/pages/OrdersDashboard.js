import AdminOrders from "@/components/AdminOrders";
import useOrders from "@/utils/useOrders";
import React from "react";

const OrdersDashboard = () => {
  const orders = useOrders();

  return (
    <div>
      {" "}
      <AdminOrders orders={orders} />{" "}
    </div>
  );
};

export default OrdersDashboard;
