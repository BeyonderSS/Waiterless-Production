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
import useOrders from "../components/useOrders";

function Dashboard() {
  // Dashboard.js

  const orders = useOrders();
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <div>
      <GenerateQR />
    </div>
  );
}

export default Dashboard;
