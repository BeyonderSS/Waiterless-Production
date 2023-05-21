import NotAuth from '@/components/NotAuth';
import { useAuth } from '@/context/AuthContext';
import { firestore } from '@/utils/initFirebase';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const FetchLeads = () => {
    const { user, signInWithGoogle, handleSignOut, role, restaurantId } =
    useAuth();
    const [leads , setLead] = useState([]);
    useEffect(() => {
   const fetchLeads= async()=>{
    const leadRef = collection(firestore, "ContactLeads");
    const leadQuery = query(leadRef)
    const querySnapshot = await getDocs(leadQuery);
    const leadData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLead(leadData);
    }
    fetchLeads();
}, []);
  return (
    <div>
          {role == "SuperAdmin" && (
      <div className='pt-24'>
        {leads.map((lead)=>(
            <div key={lead.email}>
          <div>
            
            {lead.email}
            </div>  
           <div>
            
             {lead.message}
            </div>
            <div>
                {lead.name}
                </div>
           <div>
            {lead.phone}
            </div> 
           <div>
            
            {lead.subject}
            </div> 
           <div>
            
           {lead.createdAt.toDate().toLocaleString()}
            </div> 
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
    
  )
}

export default FetchLeads