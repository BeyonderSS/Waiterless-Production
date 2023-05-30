// useOrders.js
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/utils/initFirebase";
import { useAuth } from "../context/AuthContext";
export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [staticO , setStaticO] = useState([]);
  const { restaurantId, user } = useAuth();
  const today = new Date();
  const date = today.toDateString();
  
  useEffect(() => {
    
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

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (restaurantId) {
        const collectionRef = collection(firestore, "Orders");
        const docRef = doc(collectionRef, restaurantId);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const orderData = docSnapshot.data().orders;
          console.log(orderData);

          setStaticO(orderData);
        } else {
          console.log("No orders found.");
        }
      }
    };

    fetchMenuItems();
  }, [restaurantId]);
  

  return [orders,staticO];
}
