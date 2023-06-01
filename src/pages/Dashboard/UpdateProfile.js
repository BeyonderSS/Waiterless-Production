import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../utils/initFirebase";
import { useExpiry } from "@/context/ExpiryContext";
import Bill from "@/components/Bill";

const UpdateProfile = () => {
  const { expiry } = useExpiry();
  const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [name, setName] = useState("");
  const [numTables, setNumTables] = useState("");
  const [docRef, setdocRef] = useState();
  const [rId, setRId] = useState("");
  const [rKey, setRKey] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gst, setGST] = useState("");
  const [Addr, setAddr] = useState("");
  
  useEffect(() => {
    if (restaurantId) {
      async function fetchRestaurant() {
        const q = query(
          collection(firestore, "Restaurants"),
          where("id", "==", restaurantId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setdocRef(doc.id);
          setRestaurant(doc.data());
          setAdminEmail(doc.data().adminEmail);
          setName(doc.data().name);
          setNumTables(doc.data().numTables);
          setRId(doc.data().razorpayKey);
          setRKey(doc.data().razorpaySecret);
        });
      }
      fetchRestaurant();
    }
  }, [restaurantId]);

  //   async function deleteUserIfEmailMatches() {
  //     const q = query(
  //       collection(firestore, "users"),
  //       where("email", "==", adminEmail)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach(async (doc) => {
  //       if (doc.data().email === user.email) {
  //         await deleteDoc(doc.ref);
  //         console.log("User document deleted successfully");
  //       }
  //     });
  //   }

  const handleUpdate = async () => {
    const restaurantRef = doc(firestore, "Restaurants", docRef);
    await updateDoc(restaurantRef, {
      adminEmail: adminEmail,
      name: name,
      numTables: numTables,
      razorpayKey: rId,
      razorpaySecret: rKey,
      phone:phoneNo,
      address:Addr,
      gstin:gst,
    });

    // const q = query(collection(firestore, "users"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(async (doc) => {
    //   if (doc.data().email === adminEmail) {
    //     await deleteDoc(doc.ref);
    //     console.log("User document deleted successfully");
    //   }
    // });
    // querySnapshot.forEach(async (doc) => {
    //   if (doc.data().email === user.email) {
    //     await deleteDoc(doc.ref);
    //     console.log("Admin document deleted successfully");
    //   }
    // });
    console.log("Document updated successfully");
    alert("Profile Updated Successfully");
  };

  return (
    <div className="">
      {/* {expiry == true && role == "Admin" && <Bill />} */}
      <div className="md:pl-96 pt-28 flex justify-center items-center ">
        {restaurant ? (
          <form className="  md:w-[500px] w-80 bg-[#4ea0bd]/40 p-4 rounded-xl">
            {/* <div className="mb-4">
              <label
                htmlFor="adminEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="numTables"
                className="block text-gray-700 font-bold mb-2"
              >
                Number of Tables
              </label>
              <input
                type="number"
                id="numTables"
                value={numTables}
                onChange={(e) => setNumTables(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rId"
                className="block text-gray-700 font-bold mb-2"
              >
                RazorPay Key
              </label>
              <input
                type="text"
                id="rId"
                value={rId}
                onChange={(e) => setRId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rKey"
                className="block text-gray-700 font-bold mb-2"
              >
                RazorPay Secret
              </label>
              <input
                type="text"
                id="rKey"
                value={rKey}
                onChange={(e) => setRKey(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gst"
                className="block text-gray-700 font-bold mb-2"
              >
                GST No.
              </label>
              <input
                type="text"
                id="gst"
                value={gst}
                onChange={(e) => setGST(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Addr"
                className="block text-gray-700 font-bold mb-2"
              >
                Restaurant Address
              </label>
              <input
                type="text"
                id="Addr"
                value={Addr}
                onChange={(e) => setAddr(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phoneno"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone No.
              </label>
              <input
                type="text"
                id="phoneno"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </form>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
