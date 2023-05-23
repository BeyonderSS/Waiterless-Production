import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import { FaStar } from "react-icons/fa";
import useRazorpayCredentials from "../utils/useRazorpayCredentials";
function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [grandTotal, setGrandTotal] = useState(0);
  const [restroId, setRestroId] = useState(null);
  const { razorpayKey, razorpaySecret } = useRazorpayCredentials(restroId);
  // console.log("razorpayId:", razorpayKey, "razorpaysec:", razorpaySecret);

  // console.log(restroId);

  useEffect(() => {
 
      if (user?.email) {
        // <-- Add a check to make sure user exists before accessing its email property

        const querySnapshot = query(
          collection(firestore, "Orders"),
          where("status", "==", "new"),
          where("paymentStatus", "==", "pending"),
          where("userEmail", "==", user.email)
        );

        const unsubscribe =   onSnapshot(querySnapshot, (snapshot) => {
          const filteredOrders = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(
              (order) =>
                order.status === "new" && order.paymentStatus === "pending"
            );
          // console.log("filtered orders:", filteredOrders);
          if (filteredOrders.length != 0) {
            setRestroId(filteredOrders[0].restaurantId);
          }else{
            console.log("no orders")
          }
          setOrders(filteredOrders);
          console.log(filteredOrders)
        });
        return () => {
          unsubscribe();
        };
      }
     
 
  }, [user?.email]);

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
      body: JSON.stringify({
        amount,
        razorpayKey: razorpayKey,
        razorpaySecret: razorpaySecret,
      }),
    }).then((t) => t.json());

    var options = {
      key: razorpayKey, // Enter the Key ID generated from the Dashboard
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
        orders.forEach(async (order) => {
          const orderRef = doc(firestore, "Orders", order.id);
          await updateDoc(orderRef, {
            paymentStatus: "paid",
            status: "old",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
        });
      },
      prefill: {
        name: "Florishers Edge",
        email: "",
        contact: "",
      },
    };
    // console.log(orders);
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

  // console.log("restro iD:", restroId);
  return (
    <div className="bg-white min-h-screen md:pt-24 pt-16">
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
          <h1 className="text-3xl font-bold mb-8">Your Active Orders</h1>
          <ul className="space-y-8">
            {orders.map((order) => (
              <li
                key={order.id}
                className={`bg-white shadow-md rounded-lg p-4 ${
                  order.status === "new" && order.paymentStatus === "pending"
                    ? ""
                    : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-1/2">
                    <h3 className="text-lg font-bold mb-2 ">Items</h3>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between bg-green-50 p-4 rounded-3xl"
                        >
                          <div className="inline-flex">
                            <img
                              src={item.image}
                              alt=""
                              className="max-h-16 rounded-3xl"
                            />
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
                      <p className="text-gray-800 pt-10 text-lg">
                        <span className="font-bold text-gray-800">Total:</span>{" "}
                        ₹{order.total.toFixed(2)}
                      </p>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-gray-800 py-4 flex justify-center items-center">
            Grand Total: ₹{grandTotal}
          </div>
          <div className="  flex justify-center items-center">
            {razorpayKey && razorpaySecret && (
              <button
                onClick={makePayment}
                className="bg-green-600 text-white font-bold px-10 py-2 rounded-xl "
              >
                End Meal &amp; PayNow
              </button>
            )}
          </div>

          <div className="text-gray-800 text-2xl flex justify-center items-center py-10">
            Not Satisfied Yet? please scan the Qr on the table to Order More!
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;