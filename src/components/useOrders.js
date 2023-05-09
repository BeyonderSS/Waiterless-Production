// useOrders.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "@/utils/initFirebase";

export default function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = collection(firestore, "Orders");
    const q = query(ordersRef ,orderBy("status"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
   
      console.log(newOrders)
      setOrders(newOrders);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return orders;
}
