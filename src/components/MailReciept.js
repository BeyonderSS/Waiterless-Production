import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const MailReceipt = ({
  senderEmail,
  recipientEmail,
  orderId,
  orderBy,
  tableNo,
  grandTotal,
  items,
}) => {
  const handleMail = () => {
    const receipt = `
      Order Summary
      -------------
      Order ID: ${orderId}
      Ordered By: ${orderBy}
      Table No: ${tableNo}
      
      Items:
      ${items
        .map(
          ({ dishName, price, quantity }) =>
            `- ${dishName}: $${price} x ${quantity}`
        )
        .join("\n")}
      
      Grand Total: $${grandTotal}
    `;

    console.log(receipt);

    const mailTo = `mailto:${recipientEmail}?subject=Order Receipt&body=${encodeURIComponent(
      receipt
    )}&cc=${senderEmail}`;

    window.location.href = mailTo;
  };

  return (
    <button
      onClick={handleMail}
      className="flex justify-center items-center p-2 rounded-xl md:mr-2 mb-2 md:mb-0 text-white bg-blue-500 hover:bg-blue-600 hover:text-gray-200 transition ease-in-out duration-200"
    >
      <FaTelegramPlane className="pr-2 text-2xl" /> Send
    </button>
  );
};

export default MailReceipt;
