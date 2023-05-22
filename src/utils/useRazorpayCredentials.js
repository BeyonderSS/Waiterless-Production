import { useState, useEffect } from "react";
import { firestore } from "../utils/initFirebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useRazorpayCredentials = (restroId) => {
  const [razorpayKey, setRazorpayKey] = useState("");
  const [razorpaySecret, setRazorpaySecret] = useState("");

  useEffect(() => {
    const fetchRazorpayCredentials = async () => {
      const q = query(
        collection(firestore, "Restaurants"),
        where("id", "==", restroId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setRazorpayKey(doc.data().razorpayKey);
        setRazorpaySecret(doc.data().razorpaySecret);
      });
    };

    fetchRazorpayCredentials();
  }, [restroId]);

  return { razorpayKey, razorpaySecret };
};
export default useRazorpayCredentials;
