import { useExpiry } from "@/context/ExpiryContext";
import React from "react";
import Invoice from "./Invoice";

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
  } = useExpiry();

  return (
    <div className="md:pl-80">
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
      />{" "}
    </div>
  );
};

export default Bill;
