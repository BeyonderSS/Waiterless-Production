import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import MailInvoice from "./MailInvoice";

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
    const mailTo = `mailto:${recipientEmail}?subject=Order Receipt&body=${encodeURIComponent(
      `<html><body>${MailInvoice({
        orderId,
        orderBy,
        tableNo,
        grandTotal,
        items,
      })}</body></html>`
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
