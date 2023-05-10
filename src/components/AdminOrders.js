import React from "react";
import { PropagateLoader } from "react-spinners";

const AdminOrders = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="max-w-7xl h-screen mx-auto px-4 pt-24 flex justify-center items-center">
        <PropagateLoader color="#F97317" />
      </div>
    );
  }

  return (
    <div>
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
                backgroundColor: order.status === "new" ? "#FCE7D0" : "#F3F4F6",
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
            </div>
          ))}
        </div>
        {/* <GenerateQR /> */}
      </div>
    </div>
  );
};

export default AdminOrders;
