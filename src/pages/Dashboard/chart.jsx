"use client";

import { Card, AreaChart, Title, Text } from "@tremor/react";

const valueFormatter = (number) =>
  `₹ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Chart({ data }) {
  return (
    <Card className="mt-8">
      <Title>Performance</Title>
      <Text>Comarison Between No. of Orders & Earned In the Year</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={["Orders", "Total"]}
        index="Month"
        colors={["indigo", "fuchsia"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
