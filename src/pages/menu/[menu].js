import MenuPage from "@/components/MenuPage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../utils/initFirebase";

const Menu = () => {
  const router = useRouter();
  console.log(router);
  const tableNo = router.query.tableno;
  const restaurant = router.query.restaurant
  const menu = router.query.menu
  console.log(restaurant,menu,tableNo)
  
  return (
    <div className="">
      <MenuPage tableNo={tableNo} />
    </div>
  );
};

export default Menu;
