import React from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
const PostPaidCheckout = ({ cartItems, tableNo,clearCart }) => {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user);
 
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
        total: total,
      };
      const ordersRef = collection(firestore, "Orders");
      await addDoc(ordersRef, orderData);

      clearCart()
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-[#E8772E]">
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Pay Now
                <span className="mt-2 block h-1 w-10 bg-orange-600 sm:w-20"></span>
              </h1>

              <button
                onClick={placeOrder}
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-orange-500 sm:text-lg"
              >
                Confirm &amp; Place Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-orange-800 to-orange-400 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div className="inline-flex">
                      <img src={item.image} alt="" className="max-h-16" />
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

              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>
                    ₹{" "}
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPaidCheckout;