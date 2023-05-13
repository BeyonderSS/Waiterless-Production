import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
        // console.log(link);
        codes.push(<QRCodeCanvas key={`${restaurant.id}-${i}`} value={link} />);
      }
    });
    setQrCodes(codes);
  };

  const handleGenerateQRCodes = () => {
    generateQRCodes();
  };

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
    <div class="flex flex-col justify-center items-center bg-green-100 pt-24">
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-8"
        onClick={handleGenerateQRCodes}
      >
        Generate QR Codes
      </button>
      <div class="">
        {qrCodes.length > 0 ? (
          <div>
            <div class="grid md:grid-cols-5 grid-cols-1 gap-4 mt-8">
              {qrCodes.map((qr, index) => (
                <div
                  key={index}
                  class="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4"
                >
                  <div
                    id={`qr-${index}`}
                    class="flex flex-col space-y-4 justify-center items-center"
                  >
                    {qr}
                    <div class="text-gray-500 text-sm flex flex-col justify-center items-center">
                      Waiterless.tech <span>PoweredBy Flourishers Edge</span>
                    </div>
                  </div>
                  <p class="mt-2 font-medium text-gray-700">{`Table No. ${
                    index + 1
                  }`}</p>
                  <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                    onClick={() => handleDownload(index)}
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
            <div class="flex flex-col items-start justify-start h-32 mt-8">
              <p class="text-gray-500 text-sm">
                RestroId: {restaurantData[0].id}
              </p>
              <p class="text-gray-500 text-sm">
                Restro Name: {restaurantData[0].name}
              </p>
              <p class="text-gray-500 text-sm">
                Total Tables: {restaurantData[0].numTables}
              </p>
            </div>
          </div>
        ) : (
          <div class="flex flex-col items-center justify-center h-32">
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
