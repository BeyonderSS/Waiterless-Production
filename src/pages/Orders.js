import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import { FaStar } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "Orders"),
          where("status", "==", "new"),
          where("paymentStatus", "==", "pending"),
          where("userEmail", "==", user.email)
        )
      );
      const filteredOrders = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (order) => order.status === "new" && order.paymentStatus === "pending"
        );
      setOrders(filteredOrders);
    };
    fetchOrders();
  }, [user.email]);

  useEffect(() => {
    const total = orders.reduce((acc, order) => acc + order.total, 0);
    setGrandTotal(total);
  }, [orders]);

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const amount = grandTotal;
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Florishers Edge Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "/next.svg",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        console.log("razorpay_payment_id  :", response.razorpay_payment_id);
        console.log("razorpay_order_id :", response.razorpay_order_id);
        console.log("razorpay_signature :", response.razorpay_signature);

        // Update payment status and order status
        const orderRef = doc(firestore, "Orders", orders[0].id);
        updateDoc(orderRef, {
          paymentStatus: "paid",
          status: "old",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        });
      },
      prefill: {
        name: "Florishers Edge",
        email: "",
        contact: "",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div className="bg-[#FEFCE8] min-h-screen md:pt-24 pt-16">
      {orders.length === 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl font-bold mb-8">No Active Orders</p>
            <p className="text-lg font-medium">
              Scan the QR code on the table &amp; Order Up now
            </p>
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 md:px-16 lg:px-24 xl:px-32">
          <h1 className="text-2xl font-bold mb-8">Active Orders</h1>
          <ul className="space-y-8">
            {orders.map((order) => (
              <li
                key={order.id}
                className={`bg-white shadow-md rounded-lg p-4 ${
                  order.status === "new" && order.paymentStatus === "pending"
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-1/2">
                    <h3 className="text-md font-bold mb-2">Items</h3>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <div className="inline-flex">
                            <img src={item.image} alt="" className="max-h-16" />
                            <div className="ml-3">
                              <p className="text-base font-semibold text-gray-800">
                                {item.dishName}
                              </p>
                              <p className="text-sm font-medium text-gray-800 text-opacity-80">
                                Quantity {item.quantity}
                              </p>
                              <p className="flex  pt-1">
                                {[...Array(Math.round(item.rating))].map(
                                  (_, i) => (
                                    <FaStar
                                      key={i}
                                      className="text-yellow-500 mr-1"
                                    />
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-gray-800">
                            ₹{item.price}
                          </p>
                        </li>
                      ))}
                      <p className="text-gray-800">
                        <span className="font-bold text-gray-800">Total:</span>{" "}
                        ₹{order.total.toFixed(2)}
                      </p>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={makePayment}
            className="bg-[#E8772E] text-white font-bold px-4 py-2 rounded mt-4"
          >
            End Meal &amp; PayNow
          </button>

          <div className="text-gray-800">
            Not Satisfied Yet? please scan the Qr on the table to Order Up!
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
