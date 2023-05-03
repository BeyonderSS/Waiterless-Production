import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import Image from "next/image";
import { motion } from "framer-motion";
import { BarLoader } from "react-spinners";

const MenuPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      const menuQuery = query(menuCollectionRef);
      const menuSnapshot = await getDocs(menuQuery);
      const menuData = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuData);
      setloading(false);
    };
    fetchMenuItems();
  }, []);

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
    <div className="flex flex-col items-center  min-h-screen pt-24 bg-gray-100  pb-8">
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <BarLoader color="#E8772E" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => {
            const existingItem = cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            const quantity = existingItem ? existingItem.quantity : 0;
            return (
              <div
                key={item.id}
                className="flex flex-col pb-4 md:w-96 w-80 h-96 items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform "
              >
                <img
                  src={item.image}
                  alt={item.dishName}
                  className=" w-full h-60 object-cover mb-4"
                />
                <h2 className="text-lg font-bold">{item.dishName}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center">
                  {[...Array(Math.round(item.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                  ))}
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
                      className="bg-[#E8772E] text-white py-2 px-4 rounded-full hover:bg-[#E8772E]-dark mr-2"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <FaMinus />
                    </motion.button>
                    <span className="text-lg font-bold">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="bg-[#E8772E] text-white py-2 px-4 rounded-full hover:bg-[#E8772E]-dark ml-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="bg-[#E8772E] text-white py-2 px-4 flex flex-row justify-center items-center rounded-full mt-4 hover:bg-[#E8772E]-dark"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart className="mr-2" />
                    <span> Add to Cart</span>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      )}
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
          className="flex items-center justify-between w-full rounded-t-3xl md:px-16 px-12 py-4 bg-white shadow-lg fixed bottom-0  "
        >
          <div>
            <h2 className="text-lg font-bold">Cart</h2>
            <p className="text-gray-600">{cartItems.length} items</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xl font-bold">
              $
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
                className="bg-[#E8772E] flex flex-row justify-center items-center space-x-2 text-white py-2 px-4 rounded-full mr-4 hover:bg-[#E8772E]-dark"
              >
                <MdOutlineFastfood className="" /> <span>Checkout</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}{" "}
      {/* checkout section  */}
      <div
        ref={menuRef}
        onClick={() => setIsMenuOpen(false)}
        className={`scrollbar-none scrollbar-thumb-gray-400/20 h-screen scrollbar-track-gray-100 transform duration-500 ease-in-out fixed top-0   w-full z-50 overflow-y-auto bg-[#E8772E] rounded-l-md shadow-sm ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        Checkout content here
      </div>
    </div>
  );
};

export default MenuPage;
