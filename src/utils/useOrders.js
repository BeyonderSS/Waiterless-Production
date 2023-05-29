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

        // Sort orders by status, with "new" statuses at the top
        const sortedOrders = Object.values(ordersData).sort((a, b) => {
          if (a.status === "new" && b.status !== "new") {
            return -1; // "new" status comes before other statuses
          } else if (a.status !== "new" && b.status === "new") {
            return 1; // "new" status comes after other statuses
          }
          return 0; // Preserve the original order for orders with the same status
        });

        setOrders(sortedOrders);
      });

      // Cleanup function
      return () => {
        unsubscribe();
      };
    }
  }, [restaurantId, date]);

  return orders;
}
