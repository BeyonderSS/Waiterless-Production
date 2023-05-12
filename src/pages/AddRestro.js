import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import NotAuth from "@/components/NotAuth";

const AddRestro = () => {
  const { user, restaurantId,role,signInWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [numTables, setNumTables] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  console.log(restaurantId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate custom restaurant id
    const customId =
      name.toLowerCase().replace(/\s+/g, "") +
      Math.random().toString(36).substr(2, 9) +
      Date.now();

    // Check if restaurant with same id already exists in database
    const restaurantsRef = collection(firestore, "Restaurants");
    const q = query(restaurantsRef, where("id", "==", customId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("A restaurant with that name already exists.");
      setSuccess(false);
      return;
    }

    // Add new restaurant to database
    try {
      await addDoc(restaurantsRef, {
        id: customId,
        name,
        numTables,
        createdBy: user.email,
        adminEmail: email,
        
      });

      setError("");
      setSuccess(true);
      setName("");
      setNumTables("");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center max-w-sm mx-auto  h-screen"
    >
        { role == "SuperAdmin" && (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="numTables" className="block font-medium">
            Number of Tables
          </label>
          <input
            type="number"
            id="numTables"
            value={numTables}
            onChange={(e) => setNumTables(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Admin Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 font-medium text-sm">
              Restaurant added successfully!
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Restaurant
          </button>
        </div>
      </form>
      )}
      {!user ? (
  <div className="flex flex-col items-center min-h-screen pt-24 bg-white pb-8">
    Please Login First
    <button
      onClick={signInWithGoogle}
      className="cursor-pointer text-xl text-white p-1 px-14 bg-orange-500 rounded-full"
    >
      Login
    </button>
  </div>
) : (
  role !== "SuperAdmin" ? (
    <NotAuth />
  ) : null
)}

    </motion.div>
  );
};

export default AddRestro;
