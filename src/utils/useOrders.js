// useOrders.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { firestore } from "@/utils/initFirebase";
import { useAuth } from "../context/AuthContext"
export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const { restaurantId,user } = useAuth();

  useEffect(() => {
    console.log(restaurantId)
    if(restaurantId){
    const ordersRef = collection(firestore, "Orders");
    const q = query(ordersRef, where("restaurantId", "==", restaurantId), orderBy("status"));


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
  }
  }, [restaurantId,user]);

  return orders;
}
