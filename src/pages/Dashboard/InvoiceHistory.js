import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import Invoice from "@/components/Invoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

const InvoiceHistory = () => {
  const { user, restaurantId, role } = useAuth();
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurantId) {
      const fetchInvoiceData = async () => {
        const invoicesRef = collection(firestore, "Invoices");
        const queryRef = query(
          invoicesRef,
          where("restroId", "==", restaurantId)
        );

        try {
          const querySnapshot = await getDocs(queryRef);

          if (querySnapshot.empty) {
            console.log("No past invoices.");
            setLoading(false);
            return;
          }

          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });

          // Sort invoices by lastExpiryDate in descending order
          data.sort(
            (a, b) => new Date(b.lastExpiryDate) - new Date(a.lastExpiryDate)
          );

          setInvoiceData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching invoices:", error);
          setLoading(false);
        }
      };

      fetchInvoiceData();
    }
  }, [restaurantId]);

  const handleDownload = () => {
    const input = document.getElementById("invoice-container");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      pdf.addImage(imgData, "PNG", 0, 0, 240, 207);
      pdf.save("invoice.pdf");
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center md:pl-80 h-screen">
        <PropagateLoader color="#10B981" />
      </div>
    );
  }

  if (!invoiceData.length) {
    return <div className="md:pl-80 pt-20 bg-green-100">No past invoices.</div>;
  }

  return (
    <div className="md:pl-80 pt-20 bg-green-100">
      {invoiceData.map((invoice) => (
        <div
          key={invoice.invoiceNo}
          className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
          <h1 className="text-xl">
            {" "}
            <span className="font-semibold"> Paid at: </span>{" "}
            {invoice.paymentDate}
          </h1>
          <div id="invoice-container">
            <Invoice
              restroName={invoice.restroName}
              numTables={invoice.numTables}
              restroId={invoice.restroId}
              rate={invoice.rate}
              expiryDate={invoice.lastExpiryDate}
              daysInMonth={invoice.daysInMonth}
              noOrders={invoice.noOrders}
              bill={invoice.bill}
              GST={invoice.GST}
              grandTotal={parseFloat(invoice.grandTotal)}
              invoiceNo={invoice.invoiceNo}
              paymentStatus={invoice.paymentStatus}
              paymentDate={invoice.paymentDate}
            />
          </div>

          <div className="flex justify-center py-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center "
              onClick={handleDownload}
            >
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceHistory;
