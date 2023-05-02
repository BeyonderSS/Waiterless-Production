import React, { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore } from "../utils/initFirebase";

const AddItems = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    dishName: "",
    price: "",
    rating: "",
    id: "",
  });

  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image == "") {
      alert("Please add the file");
    }
    const storage = getStorage();

    const storageRef = ref(storage, `images/${formData.id}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    setUploaded(false);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
        setUploaded(true);
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if item with the same ID exists
    const itemsRef = collection(firestore, "Menu");
    const q = query(itemsRef, where("id", "==", formData.id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert("An item with the same ID already exists.");
      return;
    }

    // Upload image to Firebase Storage
    handleUpload();
    // Add item to Firestore

    try {
      if (uploaded == true) {
        await addDoc(itemsRef, {
          dishName: formData.dishName,
          price: formData.price,
          image: url,
          rating: formData.rating,
          id: formData.id,
        });
        alert("Item added to menu.");

        setFormData({
          dishName: "",
          price: "",
          image: null,
          rating: "",
          id: "",
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding item to menu.");
    }
  };
  console.log(url);
  return (
    <div className="h-screen md:pt-40 pt-24 bg-gray-100">
      <h1 className="flex text-3xl my-4 justify-center font-semibold text-gray-800 items-center">
        Add Items To Menu
      </h1>
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="dishName"
              className="block font-medium text-gray-700"
            >
              Dish Name:
            </label>
            <input
              type="text"
              id="dishName"
              name="dishName"
              value={formData.dishName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium text-gray-700">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-medium text-gray-700">
              Image:
            </label>
            <input
              type="file"
              accept="/image/*"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer bg-gray-100 hover:bg-gray-200 p-2"
            >
              {formData.image ? "Image uploaded" : "Upload image"}
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="rating" className="block font-medium text-gray-700">
              Rating:
            </label>
            <input
              type="text"
              id="rating"
              name="rating"
              min={1}
              max={5}
              value={formData.rating}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block font-medium text-gray-700">
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
