import React from "react";

const MailInvoice = ({ orderId, orderBy, tableNo, grandTotal, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Invoice</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Order ID:</span>
        <span>{orderId}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Ordered By:</span>
        <span>{orderBy}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Table No:</span>
        <span>{tableNo}</span>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        {items.map(({ dishName, price, quantity }) => (
          <div key={dishName} className="flex justify-between items-center mb-1">
            <span>{dishName}</span>
            <span>{`$${price} x ${quantity}`}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Grand Total:</span>
        <span>{`$${grandTotal}`}</span>
      </div>
    </div>
  );
};

export default MailInvoice;
