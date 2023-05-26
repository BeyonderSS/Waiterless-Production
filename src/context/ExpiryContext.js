import React, { createContext, useState, useEffect, useContext } from "react";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";

export const ExpiryContext = createContext();
export const useExpiry = () => useContext(ExpiryContext); // Use ExpiryContext here

export const ExpiryProvider = ({ children }) => {
  const [expiry, setExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState();
  const { user, restaurantId } = useAuth();
const [orders , setOrders] = useState([])
  const today = new Date();
  const date = today.toDateString();

  useEffect(() => {
    if (restaurantId) {
      const fetchRestaurant = async () => {
        const q = query(collection(firestore, "Restaurants"), where("id", "==", restaurantId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setExpiryDate(doc.data().expiry);  
        });
      };
      fetchRestaurant();
  
      const today = new Date().setHours(0,0,0,0);
      const expiryDateTime = new Date(expiryDate).setHours(0,0,0,0);
      console.log(expiryDateTime)
      if (today >= expiryDateTime) {
        setExpiry(true);
      } else {
        setExpiry(false);
      }
    }
  }, [restaurantId, expiryDate]);

//   billing for the admin dashboard

useEffect(() => {
    const fetchItems = async () => {
      console.log(restaurantId);
      if (restaurantId) {
        const ordersRef = collection(firestore, "Orders");
        const q = query(ordersRef, where("restaurantId", "==", restaurantId));
        const querySnapshot = await getDocs(q);

        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orders);
      }
    };
    fetchItems();
    // Cleanup function
  }, [restaurantId, user]);

 // No of orders and total revenue every month
 const ordersByMonth = {};

 const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  orders.forEach((order) => {
    const orderYear = new Date(order.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();

    if (orderYear === currentYear) {
      const month = new Date(order.createdAt).getMonth();
      const monthName = monthNames[month];
      if (!ordersByMonth[monthName]) {
        ordersByMonth[monthName] = {
          orders: 1,
          total: order.total,
        };
      } else {
        ordersByMonth[monthName].orders++;
        ordersByMonth[monthName].total += order.total;
      }
    }
  });

  const ordersData = Object.keys(ordersByMonth).map((monthName) => ({
    Month: monthName.slice(0, 3),
    Orders: ordersByMonth[monthName].orders,
  }));

  ordersData.sort((a, b) => {
    return monthNames.indexOf(a.Month) - monthNames.indexOf(b.Month);
  });





  
  const [bill, setBill] = useState(0);
  useEffect(() => {
    if (user) {
      function logOrdersByCurrentMonth(ordersData) {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString("default", {
          month: "short",
        });

        ordersData.forEach((order) => {
          if (order.Month === currentMonth) {
            console.log(order.Orders);
            if (order.Orders > 0) {
              setBill(order.Orders * 0.49);
            }
          }
        });
      }
      logOrdersByCurrentMonth(ordersData);
    }
  }, [ordersData, user]);

  return (
    <ExpiryContext.Provider value={{ expiryDate, expiry,bill }}>
      {children}
    </ExpiryContext.Provider>
  );
};
