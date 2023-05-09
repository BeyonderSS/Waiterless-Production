import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GenerateQR = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);

  const { user, restaurantId } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        const q = query(
          collection(firestore, "Restaurants"),
          where("adminEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const restaurants = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          restaurants.push({
            id: data.id,
            name: data.name,
            numTables: data.numTables,
          });
        });
        setRestaurantData(restaurants);
      };
      fetchRestaurants();
    }
  }, [user]);

  const generateQRCodes = () => {
    const codes = [];
    restaurantData.forEach((restaurant) => {
      for (let i = 1; i <= restaurant.numTables; i++) {
        const link = `https://waiterless.tech/menu/${restaurant.id}?restaurant=${restaurant.name}&tableno=${i}`;
        console.log(link);
        codes.push(<QRCode key={`${restaurant.id}-${i}`} value={link} />);
      }
    });
    setQrCodes(codes);
  };

  const handleGenerateQRCodes = () => {
    generateQRCodes();
  };

  const handleDownload = (index) => {
    const qrElement = document.getElementById(`qr-${index}`);

    html2canvas(qrElement, { scale: 10 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 200, 200);
      pdf.save(`QR Code ${index}.pdf`);
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100 pt-24">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleGenerateQRCodes}
      >
        Generate QR Codes
      </button>
      <div className="">
        {qrCodes.length > 0 ? (
          <div>
            <div className="grid grid-cols-5 gap-4 mt-8">
              {qrCodes.map((qr, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4"
                >
                  <div id={`qr-${index}`}>{qr}</div>
                  <p className="mt-2 font-medium text-gray-700">{`QR Code ${index}`}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                    onClick={() => handleDownload(index)}
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-start h-32">
              <p>RestroId: {restaurantData[0].id}</p>
              <p>Restro Name: {restaurantData[0].name}</p>
              <p>Total Tables: {restaurantData[0].numTables}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            {/* <p>RestroId: {restaurantData[0].id}</p>
            <p>Restro Name: {restaurantData[0].name}</p>
            <p>Total Tables: {restaurantData[0].numTables}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQR;
