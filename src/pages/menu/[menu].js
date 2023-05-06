import MenuPage from "@/components/MenuPage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [tableNo, setTableNo] = useState(null);
  const [query, setQuery] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setMenu(router.query.menu);
    setRestaurant(router.query.restaurant);
    setTableNo(router.query.tableno);
    setQuery(router.query);
  }, [router.query]);

  let message = null;

  if (menu !== "test") {
    message = "No menu available";
  } else if (restaurant !== "PuneetKitchen") {
    message = "Restaurant not registered";
  } else if (tableNo < 1 || tableNo > 10) {
    message = "This table is not registered";
  }

  return (
    <div className="">
      {message ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="p-4 bg-red-500 text-white rounded-lg shadow-lg">
            {message}
          </div>
        </div>
      ) : (
        <MenuPage tableNo={tableNo} />
      )}
    </div>
  );
};

export default Menu;
