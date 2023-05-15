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
const AdminOrders = ({ orders }) => {
  const [receiverName, setReceiverName] = useState("");

  const handleCashPayment = async (tableNo) => {
    const ordersRef = collection(firestore, "Orders");
    const q = query(
      ordersRef,
      where("tableNo", "==", tableNo),
      where("paymentStatus", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      console.log(`Updating document with ID: ${doc.id}`);
      await updateDoc(doc.ref, {
        paymentStatus: "paid",
        paymentMode: "cash",
        status: "old",
        receiverName: receiverName, // add this line to update the receiverName field in the database
      });
    });
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl h-screen mx-auto px-4 pt-24 flex justify-center items-center">
        <PropagateLoader color="#4ADE80" />
      </div>
    );
  }

  return (
    <div className="bg-green-100">
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div>
          {orders.map((order) => (
            <motion.div
    
              initial={{ x: 200,opacity:0 }}
              animate={{ x: 0, scale: 1 ,opacity:100}}
              transition={{ duration: 0.5, stiffness: 200 }}
              key={order.id}
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
              <div className="flex flex-col md:flex-row md:justify-end md:items-center mt-4">
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
                    onClick={async () => handleCashPayment(order.tableNo)}
                    className="p-2 bg-green-500 px-4 rounded-r-lg hover:bg-green-600 hover:text-white text-gray-900"
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
