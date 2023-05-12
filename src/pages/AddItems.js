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
import { useAuth } from "@/context/AuthContext";
import UpdateItems from "@/components/UpdateItems";
import NotAuth from "@/components/NotAuth";

const AddItems = () => {
  const { user, restaurantId,role ,signInWithGoogle} = useAuth();

  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    dishName: "",
    price: "",
    rating: "",
    id: "",
    category: "", // add the new field here
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Read the image file from the input
    if (!image) {
      console.error("No image provided");
      return;
    }

    // Create a reference to the Firebase Storage location
    const storage = getStorage();
    const storageRef = ref(storage, `images/${formData.id}`);

    // Upload the image and listen for state changes, errors, and successful uploads
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Display the progress of the upload
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle errors during the upload
        console.log(error);
      },
      async () => {
        // On successful upload, get the download URL and update the state
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Insert the data into the Firestore database
        const itemsRef = collection(firestore, "Menu");
        const q = query(itemsRef, where("id", "==", formData.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("An item with the same ID already exists.");
          return;
        }

        await addDoc(itemsRef, {
          dishName: formData.dishName,
          price: formData.price,
          image: downloadURL,
          rating: formData.rating,
          id: formData.id,
          category: formData.category,
          restaurantId: restaurantId,
        });

        alert("Item added to menu.");
        setFormData({
          dishName: "",
          price: "",
          image: null,
          rating: "",
          id: "",
          category: "",
        });
      }
    );
  };

  console.log(url);
  return (
    <div>
     
        { role == "Admin" && (
    <div className="h-screen md:pt-40 pt-24 bg-orange-100">
       
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
            className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
          required
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
            className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
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
            required
          />
          <label
            htmlFor="image"
            className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 cursor-pointer bg-orange-100 hover:bg-orange-200 p-2"
          >
            {formData.image ? "Image uploaded" : "Upload image"}
          </label>
        </div>
        <label className="text-gray-700">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="ml-2 rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
          />
        </label>
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
            className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
          required
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
            className="mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
        >
          Add Item
        </button>
      </form>
    </div>
      
 
  </div>
    
    
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
  role !== "Admin" ? (
    <NotAuth />
  ) : null
)}

    
  </div>
  );
};

export default AddItems;
