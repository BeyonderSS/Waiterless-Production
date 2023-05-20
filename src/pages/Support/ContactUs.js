import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firestore } from "../../utils/initFirebase";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
        throw new Error("All fields are mandatory");
      }

      const docRef = await addDoc(collection(firestore, "ContactLeads"), {
        ...formData,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="h-screen bg-green-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-lg"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
