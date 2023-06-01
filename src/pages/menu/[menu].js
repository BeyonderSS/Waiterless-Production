import MenuPage from "@/components/MenuPage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../utils/initFirebase";
import { PropagateLoader } from "react-spinners";
import { useAuth } from "@/context/AuthContext";

const Menu = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const [restaurantDocs, setRestaurantDocs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tableNo = router.query.tableno;
  const restaurant = router.query.restaurant;
  const restroId = router.query.menu;
  const adminEmail = router.query.adminEmail;
  console.log(adminEmail);
  useEffect(() => {
    const getRestaurants = async () => {
      if (restroId) {
        setIsLoading(true);
        const docRef = doc(firestore, "Restaurants", adminEmail);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists() && docSnapshot.data().name === restaurant) {
          const data = docSnapshot.data();
          const restaurant = {
            id: adminEmail,
            name: data.name,
            numTables: data.numTables,
          };
          setRestaurantDocs([restaurant]);
          setErrorMessage(null);
        } else {
          setErrorMessage("This Menu is not Registered. Please rescan the QR.");
        }
        setIsLoading(false);
      }
    };
    getRestaurants();
  }, [restroId, restaurant, adminEmail]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PropagateLoader color="#4ADE80" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2>{errorMessage}</h2>
      </div>
    );
  }

  if (restaurantDocs.length === 0) {
    return null;
  }

  const { numTables } = restaurantDocs[0];
  if (parseInt(tableNo) < 1 || parseInt(tableNo) > parseInt(numTables)) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2>Table not registered!</h2>
      </div>
    );
  }

  return (
    <div className="">
      {user ? (
        <MenuPage tableNo={tableNo} restroId={restroId} />
      ) : (
        <div className="flex flex-col items-center  min-h-screen pt-24 bg-white  pb-8">
          Please Login First
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer text-xl text-white p-1 px-14   bg-orange-500 rounded-full"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
