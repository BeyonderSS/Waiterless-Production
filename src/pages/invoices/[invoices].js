import MailInvoice from "@/components/MailInvoice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const invoices = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState();
  const [orderBy, setOrderBy] = useState();
  const [tableNo, setTableNo] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [items, setItems] = useState();

  console.log("non stringified:", router.query);
  useEffect(() => {
    setOrderId(router.query.orderId);
    setOrderBy(router.query.orderBy);
    setTableNo(router.query.tableNo);
    setGrandTotal(router.query.grandTotal);
    // console.log(router.query.items);
    if (router.query.items) {
      try {
        const parsedItems = JSON.parse(router.query.items);
        setItems(parsedItems);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [router.query]);

  console.log("stringified data:", items);

  return (
    <div className="flex justify-center items-center h-screen">
      <MailInvoice
        orderId={orderId}
        orderBy={orderBy}
        tableNo={tableNo}
        grandTotal={grandTotal}
        items={items}
      />
    </div>
  );
};

export default invoices;
