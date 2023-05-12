import React from "react";
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

const AdminOrders = ({ orders }) => {
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
      });
    });
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl h-screen mx-auto px-4 pt-24 flex justify-center items-center">
        <PropagateLoader color="#F97317" />
      </div>
    );
  }

  return (
    <div className="bg-orange-100">
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div>
          {orders.map((order) => (
            <div
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
                    {/* <p>Category: {item.category}</p> */}
                    {/* <img src={item.image} alt="" /> */}
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    {/* <p>Rating: {item.rating}</p> */}
                  </li>
                ))}
              </ul>
              <div>
                {order.paymentStatus === "pending" && (
                  <button
                    onClick={async () => handleCashPayment(order.tableNo)}
                    className="p-1 bg-green-500 px-4 rounded-full hover:bg-green-600 hover:text-white text-gray-900 flex justify-end items-end"
                  >
                    Received in Cash
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <GenerateQR /> */}
      </div>
    </div>
  );
};

export default AdminOrders;