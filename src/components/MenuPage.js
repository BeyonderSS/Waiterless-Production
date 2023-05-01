import React, { useState } from "react";
import { FaStar, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";

const MenuPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Burger",
      image: "https://via.placeholder.com/150",
      price: 8.99,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Pizza",
      image: "https://via.placeholder.com/150",
      price: 12.99,
      rating: 4.0,
    },
    {
      id: 3,
      name: "Salad",
      image: "https://via.placeholder.com/150",
      price: 7.99,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Sandwich",
      image: "https://via.placeholder.com/150",
      price: 6.99,
      rating: 4.8,
    },

    {
      id: 2,
      name: "Pizza",
      image: "https://via.placeholder.com/150",
      price: 12.99,
      rating: 4.0,
    },
    {
      id: 3,
      name: "Salad",
      image: "https://via.placeholder.com/150",
      price: 7.99,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Sandwich",
      image: "https://via.placeholder.com/150",
      price: 6.99,
      rating: 4.8,
    },

    {
      id: 2,
      name: "Pizza",
      image: "https://via.placeholder.com/150",
      price: 12.99,
      rating: 4.0,
    },
    {
      id: 3,
      name: "Salad",
      image: "https://via.placeholder.com/150",
      price: 7.99,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Sandwich",
      image: "https://via.placeholder.com/150",
      price: 6.99,
      rating: 4.8,
    },
  ];

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menuItems.map((item) => {
          const existingItem = cartItems.find(
            (cartItem) => cartItem.id === item.id
          );
          const quantity = existingItem ? existingItem.quantity : 0;
          return (
            <div
              key={item.id}
              className="flex flex-col pb-4 md:w-96 w-80 h-96 items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover mb-4"
              />
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center">
                {[...Array(Math.round(item.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              {quantity > 0 ? (
                <div className="flex items-center mt-4">
                  <button
                    className="bg-[#E8772E] text-white py-2 px-4 rounded-full hover:bg-[#E8772E]-dark mr-2"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-bold">{quantity}</span>
                  <button
                    className="bg-[#E8772E] text-white py-2 px-4 rounded-full hover:bg-[#E8772E]-dark ml-2"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[#E8772E] text-white py-2 px-4 rounded-full mt-4 hover:bg-[#E8772E]-dark"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
      {cartItems.length>0 && (
        <div className="flex items-center justify-between w-full rounded-full md:px-16 px-12 py-4 bg-white shadow-lg fixed bottom-0 mb-2 ">
          <div>
            <h2 className="text-lg font-bold">Cart</h2>
            <p className="text-gray-600">{cartItems.length} items</p>
          </div>
          <div className="flex items-center space-x-2">
            
            <p className="text-xl font-bold">
              $
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
            {cartItems.length > 0 && (
              <button className="bg-[#E8772E] flex flex-row justify-center items-center space-x-2 text-white py-2 px-4 rounded-full mr-4 hover:bg-[#E8772E]-dark">
                <MdOutlineFastfood className="" /> <span>Checkout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
