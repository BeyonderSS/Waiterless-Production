import NotAuth from "@/components/NotAuth";
import { useAuth } from "@/context/AuthContext";
import { firestore } from "@/utils/initFirebase";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const FeedbackLeads = () => {
  const { user, signInWithGoogle, role } =
    useAuth();
  const [leads, setLead] = useState([]);
  useEffect(() => {
    const fetchLeads = async () => {
      const leadRef = collection(firestore, "Feedback");
      const leadQuery = query(leadRef);
      const querySnapshot = await getDocs(leadQuery);
      const leadData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLead(leadData);
    };
    fetchLeads();
  }, []);
  return (
    <div className="">
      {role == "SuperAdmin" && (
        <div className="pt-24  bg-green-100 h-screen">
          {leads.map((lead) => (
            <div
              key={lead.email}
              className="p-4 bg-white rounded-lg shadow mb-4"
            >
              <div className="text-gray-500">
                {lead.createdAt.toDate().toLocaleString()}
              </div>
              <div className="mt-4">
                <div className="text-gray-700 font-medium">{lead.name}</div>
                <div className="text-gray-500">{lead.email}</div>
                <div className="text-gray-500">{lead.phone}</div>
              </div>
              <div className="mt-4">{lead.message}</div>
            </div>
          ))}
        </div>
      )}

      {!user ? (
        <div className="flex flex-col items-center min-h-screen pt-24 bg-white pb-8">
          Please Login First
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer text-xl text-white p-1 px-14 bg-green-500 rounded-full"
          >
            Login
          </button>
        </div>
      ) : role !== "SuperAdmin" ? (
        <NotAuth />
      ) : null}
    </div>
  );
};

export default FeedbackLeads;
