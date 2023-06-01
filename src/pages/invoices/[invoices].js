import MailInvoice from "@/components/MailInvoice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Invoices = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState();
  const [orderBy, setOrderBy] = useState();
  const [tableNo, setTableNo] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [GSTno, setGSTno] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [items, setItems] = useState();
  const [restroName, setRestroName] = useState();

  console.log("non stringified:", router.query);
  useEffect(() => {
    setOrderId(router.query.orderId);
    setOrderBy(router.query.orderBy);
    setTableNo(router.query.tableNo);
    setGrandTotal(router.query.grandTotal);
    setGSTno(router.query.GSTNo);
    setAddress(router.query.address);
    setPhone(router.query.phone);
    setRestroName(router.query.restroName);
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
        GSTNo={GSTno}
        address={address}
        phone={phone}
        restroName={restroName}
      />
    </div>
  );
};

export default Invoices;
