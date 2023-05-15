import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { motion } from "framer-motion";
import { BarLoader, PropagateLoader } from "react-spinners";
import { RxCross1 } from "react-icons/rx";
import PrePaidCheckout from "./PrePaidCheckout";
import PostPaidCheckout from "./PostPaidCheckout";
import CategoryBubble from "./CategoryBubble";
import { useRouter } from "next/router";
import Alert from "./Alert";

const MenuPage = ({ tableNo, restroId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState();
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const menuRef = useRef();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const clearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = () => {
    clearCart(); // Call clearCart after the order is placed and the alert disappears
  };
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  function handleCartItemsChange(cartItems) {
    if (cartItems.length === 0) {
      setIsMenuOpen(false);
    }
  }
  useEffect(() => {
    handleCartItemsChange(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setloading(true);
      const menuCollectionRef = collection(firestore, "Menu");
      const menuQuery = query(
        menuCollectionRef,
        where("restaurantId", "==", restroId)
      );
      const menuSnapshot = await getDocs(menuQuery);
      const menuData = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuData);
      setloading(false);

      // Get the unique category names from the menu data
      const categories = [...new Set(menuData.map((item) => item.category))];
      setCategories(categories);
    };
    fetchMenuItems();
  }, []);

  // console.log("Categories:", categories);

  // Filter menu items by category and log the results
  useEffect(() => {
    const filteredMenuItems = {};

    menuItems.forEach((item) => {
      if (!filteredMenuItems[item.category]) {
        filteredMenuItems[item.category] = [];
      }
      filteredMenuItems[item.category].push(item);
    });
    // console.log("menuItems", menuItems);
    setFilteredMenuItems(filteredMenuItems);
  }, [menuItems]);
  // console.log("filtered menu items", filteredMenuItems);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen pt-24 bg-white  pb-8">
      {/* <Alert subMessage={"Please Login"} message={"Please Log in to place order"}/> */}
      <h1 className="text-4xl font-bold mb-8">
        Menu
        <span className="mt-2 block h-1 w-10 bg-green-600 sm:w-20"></span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <PropagateLoader color="#4ADE80" />
        </div>
      ) : (
        <div>
          {/* <div className="flex flex-row justify-center items-center  overflow-x-auto space-x-4 overflow-y-hidden">
            {categories &&
              categories.map((category) => (
                <div
                  key={category}
                  className="flex flex-row justify-center  items-center "
                >
                  <CategoryBubble category={category} />
                </div>
              ))}
          </div> */}
          <div>
            {categories &&
              categories.map((category) => (
                <div key={category}>
                  <h1 className="text-3xl font-bold p-4 flex justify-start items-center text-gray-800">
                    {category}
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {filteredMenuItems[category] &&
                      filteredMenuItems[category].map((item) => {
                        const existingItem = cartItems.find(
                          (cartItem) => cartItem.id === item.id
                        );
                        const quantity = existingItem
                          ? existingItem.quantity
                          : 0;
                        return (
                          <div
                            key={item.id}
                            className="flex flex-row justify-between  items-center h-auto p-4  bg-white border border-gray-200 rounded-2xl shadow md:flex-row w-[350px] md:max-w-4xl hover:bg-gray-100"
                          >
                            <div className="flex flex-row items-center justify-between space-x-7 p-2 leading-normal">
                              <div className="">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {item.dishName}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                  ₹{item.price}
                                </p>
                                <div className="flex items-center">
                                  {[...Array(Math.round(item.rating))].map(
                                    (_, i) => (
                                      <FaStar
                                        key={i}
                                        className="text-yellow-500 mr-1"
                                      />
                                    )
                                  )}
                                </div>
                                {quantity > 0 ? (
                                  <div className="flex items-center mt-4">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                      }}
                                      className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-800 mr-2"
                                      onClick={() => handleRemoveFromCart(item)}
                                    >
                                      <FaMinus />
                                    </motion.button>
                                    <span className="text-lg font-bold">
                                      {quantity}
                                    </span>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                      }}
                                      className="bg-green-600 text-white py-2 px-4 rounded-full  hover:bg-green-800 ml-2"
                                      onClick={() => handleAddToCart(item)}
                                    >
                                      <FaPlus />
                                    </motion.button>
                                  </div>
                                ) : (
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 17,
                                    }}
                                    className="bg-green-600 text-white py-2 px-4 flex flex-row justify-center items-center rounded-full mt-4 hover:bg-green-800"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    <MdOutlineFastfood className="mr-2" />
                                    <span> Add</span>
                                  </motion.button>
                                )}
                              </div>
                            </div>
                            <img
                              className="flex justify-center items-center object-cover w-40 h-40 rounded-3xl  "
                              src={item.image}
                              alt={item.dishName}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div
        className={` flex flex-row items-center justify-between w-full  transform duration-500 ease-in-out rounded-t-3xl  py-10 text-green-500 shadow-lg fixed bottom-0 ${
          cartItems.length > 0 ? "-translate-y-0" : "translate-y-full"
        }`}
      >
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 200 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 200 }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-row items-center justify-between w-full   rounded-t-3xl md:px-16 px-12 py-4 bg-white/30 backdrop-blur-sm text-green-500  shadow-2xl fixed bottom-0"
          >
            <div>
              <h2 className="text-lg font-bold">Cart</h2>
              <p className="text-gray-600">{cartItems.length} items</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold">
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </p>
              {cartItems.length > 0 && (
                <motion.button
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-green-600 flex flex-row justify-center items-center space-x-2 text-white py-2 px-4 rounded-full mr-4 hover:bg-green-800"
                >
                  <MdOutlineFastfood className="" /> <span>Checkout</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
      {/* checkout section  */}
      <div
        ref={menuRef}
        className={` scrollbar-thumb-gray-400/20  scrollbar-track-gray-100 transform duration-500 ease-in-out fixed top-0   w-full z-50 overflow-y-scroll scrollbar-none  rounded-l-md shadow-sm ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="absolute top-1 right-4 z-50 "
          onClick={() => setIsMenuOpen(false)}
        >
          <RxCross1 className="h-10 md:w-7 w-7" />
        </motion.button>
        <article>
          <PostPaidCheckout
            clearCart={clearCart}
            onOrderPlaced={handleOrderPlaced} // Pass the callback function to PostPaidCheckout
            tableNo={tableNo}
            cartItems={cartItems}
          />
        </article>
      </div>
    </div>
  );
};

export default MenuPage;
