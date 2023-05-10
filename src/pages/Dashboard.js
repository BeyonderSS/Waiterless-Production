import GenerateQR from "@/components/GenerateQR";
import { firestore } from "@/utils/initFirebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useOrders from "../utils/useOrders";
import AdminOrders from "@/components/AdminOrders";

function Dashboard() {
  const orders = useOrders();
  console.log("orders:", orders);

  return (
    <div>
      <AdminOrders orders={orders} />
    </div>
  );
}

export default Dashboard;
