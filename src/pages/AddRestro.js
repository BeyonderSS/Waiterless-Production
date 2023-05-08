import React, { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const AddRestro = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [numTables, setNumTables] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if restaurant name already exists in database
    const restaurantsRef = collection(firestore, "Restaurants");
    const q = query(restaurantsRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("A restaurant with that name already exists.");
      setSuccess(false);
      return;
    }

    // Add new restaurant to database
    try {
      await addDoc(restaurantsRef, {
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
    </motion.div>
  );
};

export default AddRestro;
