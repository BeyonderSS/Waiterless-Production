import { Card, Metric, Text, Flex, Grid, Title, BarList } from "@tremor/react";
import Chart from "./chart";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NotAuth from "@/components/NotAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/utils/initFirebase";
import { useExpiry } from "@/context/ExpiryContext";
import Bill from "@/components/Bill";

const website = [
  { name: "/home", value: 1230 },
  { name: "/contact", value: 751 },
  { name: "/gallery", value: 471 },
  { name: "/august-discount-offer", value: 280 },
  { name: "/case-studies", value: 78 },
];

const shop = [
  { name: "/home", value: 453 },
  { name: "/imprint", value: 351 },
  { name: "/shop", value: 271 },
  { name: "/pricing", value: 191 },
];

const app = [
  { name: "/shop", value: 789 },
  { name: "/product-features", value: 676 },
  { name: "/about", value: 564 },
  { name: "/login", value: 234 },
  { name: "/downloads", value: 191 },
];

const data = [
  {
    category: "Website",
    stat: "10,234",
    data: website,
  },
  {
    category: "Online Shop",
    stat: "12,543",
    data: shop,
  },
  {
    category: "Mobile App",
    stat: "2,543",
    data: app,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function PlaygroundPage() {
  const [orders, setOrders] = useState([]);
  const [filterByDate, setFilterByDate] = useState([]);
  // const { expiryDate, expiry ,bill } = useExpiry();
  const { user, restaurantId, role, signInWithGoogle } = useAuth();

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
  const today = new Date();
  const date = today.toDateString();
  useEffect(() => {
    const filterByDate = async () => {
      console.log(restaurantId);
      if (restaurantId) {
        const ordersRef = collection(firestore, "Orders");
        const q = query(
          ordersRef,
          where("restaurantId", "==", restaurantId),
          where("createdAt", "==", date)
        );
        const querySnapshot = await getDocs(q);

        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilterByDate(orders);
      }
    };
    filterByDate();
    // Cleanup function
  }, [restaurantId, user, date]);

  const [grandTotal, setGrandTotal] = useState(0);
  const [fliterTotal, setFilterTotal] = useState(0);
  useEffect(() => {
    const total = orders.reduce((acc, order) => acc + order.total, 0);
    setGrandTotal(total);
  }, [orders]);
  useEffect(() => {
    const total = filterByDate.reduce((acc, order) => acc + order.total, 0);
    setFilterTotal(total);
  }, [filterByDate]);

  // console.log(orders);

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

  const totalData = Object.keys(ordersByMonth).map((monthName) => ({
    Month: monthName.slice(0, 3),
    Total: ordersByMonth[monthName].total,
  }));

  ordersData.sort((a, b) => {
    return monthNames.indexOf(a.Month) - monthNames.indexOf(b.Month);
  });

  totalData.sort((a, b) => {
    return monthNames.indexOf(a.Month) - monthNames.indexOf(b.Month);
  });




  return (
    <main className="pt-20 ">
      {/* {expiry == true && role == "Admin" && <Bill />} */}
   {/* && expiry == false &&  */}
      {role == "Admin" && (
        <div className="p-4 md:p-10 md:pl-96 ">
          <div className="">
            <Grid className="gap-6" numColsSm={2} numColsLg={3}>
              <Card>
                <Flex alignItems="start">
                  <Text>Total Sales</Text>
                </Flex>
                <Flex
                  className="space-x-3 truncate"
                  justifyContent="start"
                  alignItems="baseline"
                >
                  <Metric>₹ {grandTotal}</Metric>
                  {/* <Text className="truncate">from {''}</Text> */}
                </Flex>
              </Card>
              <Card>
                <Flex alignItems="start">
                  <Text>Today&apos;s Sales</Text>
                </Flex>
                <Flex
                  className="space-x-3 truncate"
                  justifyContent="start"
                  alignItems="baseline"
                >
                  <Metric>₹ {fliterTotal}</Metric>
                  {/* <Text className="truncate">from {''}</Text> */}
                </Flex>
              </Card>
              <Card>
                <Flex alignItems="start">
                  <Text>Total Orders</Text>
                </Flex>
                <Flex
                  className="space-x-3 truncate"
                  justifyContent="start"
                  alignItems="baseline"
                >
                  <Metric> {orders.length}</Metric>
                  {/* <Text className="truncate">from {''}</Text> */}
                </Flex>
              </Card>
            </Grid>
            <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
              {data.map((item) => (
                <Card key={item.category}>
                  <Title>{item.category}</Title>
                  <Flex
                    className="space-x-2"
                    justifyContent="start"
                    alignItems="baseline"
                  >
                    <Metric>{item.stat}</Metric>
                    <Text>Total views</Text>
                  </Flex>
                  <Flex className="mt-6">
                    <Text>Pages</Text>
                    <Text className="text-right">Views</Text>
                  </Flex>
                  <BarList
                    className="mt-2"
                    data={item.data}
                    valueFormatter={dataFormatter}
                  />
                </Card>
              ))}
            </Grid>
            <Chart data={totalData} />
          </div>
        </div>
      )}

      {!user ? (
        <div className="flex flex-col items-center min-h-screen pt-24 bg-white pb-8">
          Please Login First
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer text-xl text-white p-1 px-14 bg-orange-500 rounded-full"
          >
            Login
          </button>
        </div>
      ) : role !== "Admin" ? (
        <NotAuth />
      ) : null}
    </main>
  );
}
