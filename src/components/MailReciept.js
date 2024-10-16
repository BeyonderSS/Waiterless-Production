import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { FaTelegramPlane } from "react-icons/fa";
import MailInvoice from "./MailInvoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
const MailReceipt = ({
  senderEmail,
  recipientEmail,
  orderId,
  orderBy,
  tableNo,
  grandTotal,
  items,
}) => {
  console.log("items in button", items);
  const adminEmail = senderEmail;

  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const restaurantRef = doc(firestore, "Restaurants", adminEmail);
      const restaurantSnapshot = await getDoc(restaurantRef);
      if (restaurantSnapshot.exists()) {
        const data = restaurantSnapshot.data();
        setRestaurantData(data);
      }
    };
    fetchRestaurantData();
  }, [adminEmail]);
  console.log("restaurant data:", restaurantData);

  const handleMail = () => {
    const modifiedItems = items.map((item) => {
      return {
        dishName: item.dishName,
        price: item.price,
        quantity: item.quantity,
      };
    });

    const link = `https://waiterless-production.vercel.app/invoices/abc?orderId=${orderId}&orderBy=${encodeURIComponent(
      orderBy
    )}&tableNo=${tableNo}&grandTotal=${grandTotal}&items=${encodeURIComponent(
      JSON.stringify(modifiedItems)
    )}&address=${encodeURIComponent(restaurantData.address)}&GSTNo=${
      restaurantData.gstin
    }&phone=${restaurantData.phone}&restroName=${encodeURIComponent(
      restaurantData.name
    )}`;
    console.log(link);
    const subject = "Invoice and Gratitude from Waiterless";
    const body = `Dear Customer,\n\nThank you for dining at our restaurant! We appreciate your visit and hope you had a wonderful experience. We would like to express our gratitude for choosing us and encourage you to keep visiting our establishment in the future.\n\nAs a token of our appreciation, we have prepared the invoice for your recent order. Please find the attached link to access your invoice:\n${link}\n\nThank you again for choosing Waiterless, and we look forward to serving you again soon!\n\nBest regards,\nTeam Waiterless`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}&from=${encodeURIComponent(
      senderEmail
    )}`;

    // Use the mailto: protocol to open the user's default email client
    window.location.href = mailtoLink;
  };

  // const handleDownload = () => {
  //   const input = document.getElementById("mail-invoice");

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("mail-invoice.pdf");
  //   });
  // };

  return (
    <div>
      {/* <div id="mail-invoice">
        <MailInvoice
          orderId={orderId}
          orderBy={orderBy}
          tableNo={tableNo}
          grandTotal={grandTotal}
          items={items}
        />
      </div> */}
      {/* <button
        onClick={handleDownload}
        className="flex justify-center items-center p-2 rounded-xl md:mr-2 mb-2 md:mb-0 text-white bg-blue-500 hover:bg-blue-600 hover:text-gray-200 transition ease-in-out duration-200"
      >
        <FaTelegramPlane className="pr-2 text-2xl" /> Download
      </button> */}
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
