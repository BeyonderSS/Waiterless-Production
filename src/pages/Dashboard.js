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

function Dashboard() {


  const orders = useOrders();
 
  return (
    <div>
      <GenerateQR />
    </div>
  );
}

export default Dashboard;
