import MenuPage from "@/components/MenuPage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../utils/initFirebase";
import { PropagateLoader } from "react-spinners";

const Menu = () => {
  const router = useRouter();
  const [restaurantDocs, setRestaurantDocs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tableNo = router.query.tableno;
  const restaurant = router.query.restaurant;
  const menu = router.query.menu;

  useEffect(() => {
    const getRestaurants = async () => {
      if (menu) {
        setIsLoading(true);
        const q = query(
          collection(firestore, "Restaurants"),
          where("id", "==", menu),
          where("name", "==", restaurant)
        );
        const querySnapshot = await getDocs(q);
        const restaurants = [];
        querySnapshot.forEach((doc) => {
          const { id, name, numTables } = doc.data();
          restaurants.push({ id, name, numTables });
        });
        if (restaurants.length > 0) {
          setRestaurantDocs(restaurants);
          setErrorMessage(null);
        } else {
          setErrorMessage("This Menu is not Registered please rescan the QR");
        }
        setIsLoading(false);
      }
    };
    getRestaurants();
  }, [menu, restaurant]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PropagateLoader color="#fa9805" />
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
  // let message = false;
  // if (parseInt(tableNo) < 1 || parseInt(tableNo) > parseInt(numTables)) {
  //   message = true;
  // } else {
  //   message = false;
  // }
  // console.log(message);
  if (parseInt(tableNo) < 1 || parseInt(tableNo) > parseInt(numTables)) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2>Table not registered!</h2>
      </div>
    );
  }

  return (
    <div className="">
      <MenuPage tableNo={tableNo} restroId={menu} />
    </div>
  );
};

export default Menu;
