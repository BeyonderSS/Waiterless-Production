import React from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

const Checkout = ({ cartItems }) => {
  const router = useRouter();

 
    // Handle payment logic here
    const makePayment = async () => {
      console.log("here...");
      const res = await initializeRazorpay();
  
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
  
      // Make API call to the serverless API
      const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
        t.json()
      );
      console.log(data);
      var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Florishers Edge Pvt Ltd",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for your test donation",
        image: "https://manuarora.in/logo.png",
        handler: function (response) {
          // Validate payment at server - using webhooks is a better idea.
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Florishers Edge",
          email: "dshantanu2003@gmail.com",
          contact: "9999999999",
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
                onClick={makePayment}
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-orange-500 sm:text-lg"
              >
                Place Order
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
                {/* <p className="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>₹55.00</span>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
