import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MailInvoice = ({ orderId, orderBy, tableNo, grandTotal, items }) => {
  const handleDownload = () => {
    const input = document.getElementById("mail-invoice");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("mail-invoice.pdf");
    });
  };
  console.log("Items innside MailInvoice", items);
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <div className="bg-white rounded-lg shadow-md p-6 w-80" id="mail-invoice">
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
          {items &&
            items.map(({ dishName, price, quantity }) => (
              <div
                key={dishName}
                className="flex justify-between items-center mb-1"
              >
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
      <button
        onClick={handleDownload}
        className="p-2 bg-blue-400 rounded-xl text-xl px-4 text-white hover:text-gray-200 hover:bg-blue-600"
      >
        download
      </button>
    </div>
  );
};

export default MailInvoice;
