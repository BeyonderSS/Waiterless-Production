import { Card, Metric, Text, Flex, Grid, Title, BarList } from "@tremor/react";
import Chart from "./chart";
import React from "react";
import DashNav from "@/components/DashNav";
import { useAuth } from "@/context/AuthContext";
import NotAuth from "@/components/NotAuth";

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

const categories = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
  },
];

export default function PlaygroundPage() {
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();

  return (
    <main className="pt-20 ">
    {role == "Admin" && (
     
      <div className="p-4 md:p-10 md:pl-96 ">
        <div className="">
          <Grid className="gap-6" numColsSm={2} numColsLg={3}>
            {categories.map((item) => (
              <Card key={item.title}>
                <Flex alignItems="start">
                  <Text>{item.title}</Text>
                </Flex>
                <Flex
                  className="space-x-3 truncate"
                  justifyContent="start"
                  alignItems="baseline"
                >
                  <Metric>{item.metric}</Metric>
                  <Text className="truncate">from {item.metricPrev}</Text>
                </Flex>
              </Card>
            ))}
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
          <Chart />
        </div>
      </div>
    )  }

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
