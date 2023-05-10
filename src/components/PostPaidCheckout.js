import React from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
const PostPaidCheckout = ({ cartItems, tableNo, clearCart }) => {
  const { user } = useAuth();
  const router = useRouter();
  // console.log(user);

  const placeOrder = async () => {
    try {
      // Extract required data from cartItems array
      const items = cartItems.map((item) => ({
        dishName: item.dishName,
        quantity: item.quantity,
        price: item.price,
        id: item.id,
      }));

      // Calculate total
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      // Build orderData object with required data and total
      const orderData = {
        orderId: Math.random().toString(36).substr(2, 9), // generates a random alphanumeric string of length 9
        tableNo: tableNo,
        orderby: user.displayName,
        userEmail: user.email,
        status: "new",
        paymentStatus: "pending",
        items: cartItems,
        restaurantId: cartItems[0].restaurantId,
        total: total,
      };
      const ordersRef = collection(firestore, "Orders");
      await addDoc(ordersRef, orderData);

      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="h-screen  flex flex-col ">
      <h1 className="py-2 bg-white w-full text-lg flex justify-center items-center uppercase">
        Order Summary
      </h1>

      <div className=" h-full w-full bg-[#282A2C] rounded-t-3xl">
        <div className="pt-10">
          <div className=" overflow-y-scroll h-96 scrollbar-none pb-16">
            <ul className="space-y-5 ">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-[#2E3033] p-5 m-2 rounded-xl mx-6 overflow-y-scroll scrollbar-none"
                >
                  <div className="inline-flex">
                    <img src={item.image} alt="" className="max-h-16  rounded-lg" />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {item.dishName}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        Quantity {item.quantity}
                      </p>
                      <p className="flex  pt-1">
                        {[...Array(Math.round(item.rating))].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 mr-1" />
                        ))}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    ₹{item.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute w-full bottom-0 px-5 py-2  bg-[#2E3033] rounded-t-[3rem] ">
            <div className="space-y-2 pt-6 px-2">
              <p className="text-[#8C929D]">Price</p>

              <p className="text-[#8C929D]">Tax</p>

              <div className="my-5 h-0.5 w-full bg-gray-500 rounded-full"></div>
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price</span>
                <span>
                  ₹{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center pt-10 pb-8">
              <button className="bg-orange-500 text-lg p-1 rounded-full text-white  w-40 ">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPaidCheckout;
