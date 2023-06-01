import { useExpiry } from "@/context/ExpiryContext";
import React from "react";
import Invoice from "./Invoice";
import { motion } from "framer-motion";
import { BsFillInfoCircleFill } from "react-icons/bs";
const Bill = () => {
  const {
    expiryDate,
    expiry,
    bill,
    restroId,
    numTables,
    restroName,
    daysInMonth,
    noOrders,
    rate,
    GST,
    grandTotal,
    invoiceNo,
    address,
  } = useExpiry();

  return (
    <div className="md:pl-80  overflow-x-hidden">
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <BsFillInfoCircleFill className="flex-shrink-0 inline w-5 h-5 mr-3 hover:animate-pulse" />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Opps!</span> It look like your
          subscription has expired please clear invoice to continue using our
          services .
        </div>
      </motion.div>
      <h1 className="flex justify-center items-center text-xl md:text-4xl font-semibold text-gray-900/80">
        Invioce - {invoiceNo}
      </h1>
      <Invoice
        grandTotal={grandTotal}
        GST={GST}
        rate={rate}
        bill={bill}
        noOrders={noOrders}
        daysInMonth={daysInMonth}
        expiryDate={expiryDate}
        restroName={restroName}
        numTables={numTables}
        restroId={restroId}
        invoiceNo={invoiceNo}
        address={address}
      />{" "}
    </div>
  );
};

export default Bill;
