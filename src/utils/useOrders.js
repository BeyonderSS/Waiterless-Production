// useOrders.js
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
} from "firebase/firestore";
import { firestore } from "@/utils/initFirebase";
import { useAuth } from "../context/AuthContext";
export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const { restaurantId, user } = useAuth();
  const today = new Date();
  const date = today.toDateString();
  useEffect(() => {
    console.log(restaurantId);
    if (restaurantId) {
      const ordersRef = doc(firestore, "Orders", restaurantId);

      const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
        const ordersData = snapshot.data().orders;
        console.log("Orders Data:", ordersData);
        setOrders(Object.values(ordersData));
      });

      // Cleanup function
      return () => {
        unsubscribe();
      };
    }
  }, [restaurantId, date]);

  return orders;
}
