import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MailInvoice = ({
  restroName,
  orderId,
  orderBy,
  tableNo,
  grandTotal,
  items,
  address,
  phone,
  GSTNo,
}) => {
  const handleDownload = () => {
    const input = document.getElementById("mail-invoice");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() / 1.05;
      const pdfHeight = (imgProps.height * pdfWidth) / 1.05 / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("mail-invoice.pdf");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-80" id="mail-invoice">
        <h2 className="text-2xl font-semibold mb-4">{restroName}</h2>
        <h3 className="text-lg font-semibold mb-4">Order Invoice</h3>
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
                <span>{`₹${price} x ${quantity}`}</span>
              </div>
            ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Address:</span>
          <span>{address}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Phone:</span>
          <span>{phone}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">GST No:</span>
          <span>{GSTNo}</span>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-medium">Grand Total:</span>
          <span>{`₹${grandTotal}`}</span>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="p-2 bg-blue-500 rounded-lg text-lg px-4 text-white hover:text-gray-200 hover:bg-blue-600"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default MailInvoice;
