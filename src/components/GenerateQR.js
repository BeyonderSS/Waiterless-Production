import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GenerateQR = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);

  const { user, restaurantId } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        const docRef = doc(firestore, "Restaurants", user.email);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const restaurant = {
            id: data.id,
            name: data.name,
            numTables: data.numTables,
          };
          setRestaurantData([restaurant]);
        } else {
          setRestaurantData([]);
        }
      };
      fetchRestaurants();
    }
  }, [user]);

  const generateQRCodes = () => {
    const codes = [];
    restaurantData.forEach((restaurant) => {
      console.log(restaurant);
      for (let i = 1; i <= restaurant.numTables; i++) {
        const link = `https://waiterless.tech/menu/${
          restaurant.id
        }?restaurant=${encodeURIComponent(
          restaurant.name
        )}&tableno=${i}&adminEmail=${encodeURIComponent(user.email)}`;
        // console.log(link);
        codes.push(<QRCodeCanvas key={`${restaurant.id}-${i}`} value={link} />);
      }
    });
    setQrCodes(codes);
  };
  useEffect(() => {
    if (restaurantData) {
      generateQRCodes();
    }
  }, [restaurantData]);
  const handleDownload = (index) => {
    const qrElement = document.getElementById(`qr-${index}`);

    html2canvas(qrElement, { scale: 4, width: 595, height: 842 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
        pdf.save(`QR Code ${index}.pdf`);
      }
    );
  };
  console.log(qrCodes);
  return (
    <div className="h-screen ">
      <div className="flex  flex-col justify-center items-center bg-green-100  md:pl-96 ">
        {/* <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-8"
        onClick={handleGenerateQRCodes}
        >
        Generate QR Codes
      </button> */}
        <div className="pt-24">
          {qrCodes.length > 0 ? (
            <div>
              <div className="grid md:grid-cols-5 grid-cols-1 gap-4 mt-8">
                {qrCodes.map((qr, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4"
                  >
                    <div
                      id={`qr-${index}`}
                      className="flex flex-col space-y-4 justify-center items-center"
                    >
                      {qr}
                      <div className="text-gray-500 text-sm flex flex-col justify-center items-center">
                        {restaurantData[0].name}
                        <span>Waiterless.tech</span>
                      </div>
                      <p className="mt-2 font-medium text-gray-700">{`Table No. ${
                        index + 1
                      }`}</p>
                    </div>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                      onClick={() => handleDownload(index)}
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start justify-start h-32 mt-8">
                <p className="text-gray-500 text-sm">
                  RestroId: {restaurantData[0].id}
                </p>
                <p className="text-gray-500 text-sm">
                  Restro Name: {restaurantData[0].name}
                </p>
                <p className="text-gray-500 text-sm">
                  Total Tables: {restaurantData[0].numTables}
                </p>
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
    </div>
  );
};

export default GenerateQR;
