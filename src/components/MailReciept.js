import React, { useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import MailInvoice from "./MailInvoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MailReceipt = ({
  senderEmail,
  recipientEmail,
  orderId,
  orderBy,
  tableNo,
  grandTotal,
  items,
}) => {
  const mailContent = useRef(null);

  const handleMail = () => {
    // Convert MailInvoice component into a canvas
    html2canvas(mailContent.current).then((canvas) => {
      // Convert canvas to PDF
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0);

      // Compose email with PDF attachment
      const subject = `Order Receipt for Order ID: ${orderId}`;
      const body = `Dear Customer,\n\nThank you for your order! Please find attached your order receipt.\n\nBest Regards,\nThe Restaurant`;

      const mailToLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      // Attach PDF to email
      const attachment = pdf.output("dataurlstring");
      window.location.href = `${mailToLink}&attachment=${attachment}`;
    });
  };

  return (
    <div ref={mailContent}>
      <MailInvoice
        orderId={orderId}
        orderBy={orderBy}
        tableNo={tableNo}
        grandTotal={grandTotal}
        items={items}
      />
      <button
        onClick={handleMail}
        className="flex justify-center items-center p-2 rounded-xl md:mr-2 mb-2 md:mb-0 text-white bg-blue-500 hover:bg-blue-600 hover:text-gray-200 transition ease-in-out duration-200"
      >
        <FaTelegramPlane className="pr-2 text-2xl" /> Send
      </button>
    </div>
  );
};

export default MailReceipt;
