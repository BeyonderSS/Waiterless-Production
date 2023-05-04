import React from 'react';
import { useRouter } from 'next/router';

const Checkout = () => {
  const router = useRouter();

  const handlePayment = () => {
    // Handle payment logic here
    
    router.push('/success'); // Redirect to success page after payment
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E8772E]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <form className="space-y-4" method='POST' onSubmit={''}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="font-bold">Name</label>
            <input type="text" id="name" name="name" className="border border-gray-400 p-2 rounded-lg" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="font-bold">Email</label>
            <input type="email" id="email" name="email" className="border border-gray-400 p-2 rounded-lg" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="font-bold">Phone</label>
            <input type="tel" id="phone" name="phone" className="border border-gray-400 p-2 rounded-lg" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="font-bold">Address</label>
            <textarea id="address" name="address" rows="3" className="border border-gray-400 p-2 rounded-lg"></textarea>
          </div>
          <button type="button"  className="bg-[#E8772E]/90 text-white font-bold py-2 px-4 rounded-lg hover:bg-[#E8772E] transition-colors">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
