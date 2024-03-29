import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FaTelegramPlane } from "react-icons/fa";
import MailReciept from "./MailReciept";
const AdminOrders = ({ orders }) => {
  console.log(orders);
  const { restaurantId, user } = useAuth();
  const [receiverName, setReceiverName] = useState("");
  console.log("restaurant id from  Useauth:", restaurantId);
  const handleCashPayment = async (orderId) => {
    const ordersRef = doc(firestore, "Orders", restaurantId);
    console.log(`Updating document with ID: ${ordersRef.id}`);
    await updateDoc(ordersRef, {
      [`orders.${orderId}.paymentStatus`]: "paid",
      [`orders.${orderId}.paymentMode`]: "cash",
      [`orders.${orderId}.status`]: "old",
      [`orders.${orderId}.receiverName`]: receiverName,
    });
  };

  if (orders.length === 0) {
    return (
      <div className="md:pl-80 max-w-7xl h-screen mx-auto px-4 pt-24 flex justify-center items-center ">
        <p>No orders today.</p>
      </div>
    );
  }

  return (
    <div className="bg-green-100 md:pl-96 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-24 ">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div>
          {orders.map((order) => (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 100 }}
              transition={{ duration: 0.5, stiffness: 200 }}
              key={order.orderId}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
              style={{
                borderLeft: `5px solid ${
                  order.paymentStatus === "pending" ? "red" : "green"
                }`,
                backgroundColor: order.status === "new" ? "#f46c6c" : "#F3F4F6",
              }}
            >
              <p className="font-bold">Order ID: {order.orderId}</p>
              <p>Order By: {order.orderby}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Status: {order.status}</p>
              <p>Table No: {order.tableNo}</p>
              <p>Total: {order.total}</p>
              <p>Customer Email: {order.userEmail}</p>
              <ul className="list-disc ml-4">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-bold">{item.dishName}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col md:flex-row md:justify-end md:items-end mt-4">
                {order.paymentStatus === "paid" && (
                  <MailReciept
                    items={order.items}
                    grandTotal={order.total}
                    tableNo={order.tableNo}
                    orderBy={order.orderby}
                    orderId={order.orderId}
                    senderEmail={user.email}
                    recipientEmail={order.userEmail}
                  />
                )}
                {order.receiverName && (
                  <div className="p-2 rounded-l-lg md:mr-2 mb-2 md:mb-0 ">
                    Payment Recived By.{" "}
                    <span className="font-semibold"> {order.receiverName}</span>
                  </div>
                )}
                {order.paymentStatus === "pending" && (
                  <input
                    type="text"
                    placeholder="Receiver's name"
                    className="p-2 rounded-l-lg md:mr-2 mb-2 md:mb-0"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                  />
                )}
                {order.paymentStatus === "pending" && (
                  <button
                    onClick={async () => handleCashPayment(order.orderId)}
                    className="p-2 bg-green-500 px-4 rounded-r-xl hover:bg-green-600 hover:text-white text-gray-900"
                  >
                    Approve Payment
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
