import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore } from "../../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import NotAuth from "@/components/NotAuth";
import { BarLoader, PropagateLoader } from "react-spinners";
import { useExpiry } from "@/context/ExpiryContext";
import Bill from "@/components/Bill";

const AddItems = () => {
  const { user, restaurantId, role, signInWithGoogle } = useAuth();
  const { expiry } = useExpiry();
  const [loading, setLoading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    dishName: "",
    price: "",
    rating: "",
    id: "",
    category: "", // add the new field here
  });

  const [image, setImage] = useState(null);
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
    const storageRef = ref(storage, `images/${restaurantId + formData.id}`);
  
    // Upload the image and listen for state changes, errors, and successful uploads
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Display the progress of the upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true);
        console.log(`Upload is ${progress}% done`);
        console.log(loading);
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
          alert("An item with the same ID already exists. Please choose a different ID.");
          return;
        }
  
        // Check if the restaurant document already exists
        const restaurantDocRef = doc(firestore, "Menu", restaurantId);
        const restaurantDocSnapshot = await getDoc(restaurantDocRef);
  
        if (!restaurantDocSnapshot.exists()) {
          // Create a new restaurant document
          await setDoc(restaurantDocRef, {});
        
        }
  
        // Add the menu item to the restaurant's menu map
        const menuData = {
          dishName: formData.dishName,
          price: formData.price,
          image: downloadURL,
          rating: formData.rating,
          id: formData.id,
          category: formData.category,
          restaurantId: restaurantId,
        };
  
        const restaurantMenuDocRef = doc(firestore, "Menu", restaurantId);
        const restaurantMenuDocSnapshot = await getDoc(restaurantMenuDocRef);
        if (!restaurantDocSnapshot.exists()) {
          // Create a new restaurant document
          await setDoc(restaurantDocRef, {});
          await setDoc(restaurantDocRef, {
            menu: {
              [formData.id]: menuData
            }
          });
          
        }
       else if (restaurantMenuDocSnapshot.exists()) {
          const existingMenu = restaurantMenuDocSnapshot.data().menu;
          if (existingMenu[formData.id]) {
            alert("An item with the same ID already exists. Please choose a different ID.");
            setLoading(false);
            return;
          }
          await updateDoc(restaurantMenuDocRef, {
            [`menu.${formData.id}`]: menuData
          });
        } else {
          await setDoc(restaurantMenuDocRef, {
            menu: {
              [formData.id]: menuData
            }
          });
        }
  
        setLoading(false);
        alert("Item added to menu.");
  
        setFormData({
          dishName: "",
          price: "",
          rating: "",
          id: "",
          category: ""
        });
        setImage(null);
        setUrl(null);
      }
    );
    console.log(typeof loading);
  };
  
  
  
  
  console.log(url);
  const [preloading, setPreLoading] = useState(true); // State variable for loading status
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setPreLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer when component unmounts
  }, []);
  if (preloading) {
    // Show loader while loading is true
    return (
      <div className="flex justify-center items-center min-h-screen pt-24 md:pl-80 bg-white pb-8">
        <PropagateLoader color="#4ADE80" loading={preloading} />
      </div>
    );
  }
  return (
    <div>
      <div className="md:pt-20">
        {expiry == true && role == "Admin" && <Bill />}
      </div>
      {expiry == false && (
        <div className="h-screen md:pl-80 ">
          {role == "Admin" && expiry == false && (
            <div className="h-screen md:pt-40 pt-24 bg-green-100">
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
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block font-medium text-gray-700"
                    >
                      Price:
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block font-medium text-gray-700"
                    >
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
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 cursor-pointer bg-green-100 hover:bg-green-200 p-2"
                    >
                      {formData.image ? "Image uploaded" : "Upload image"}
                    </label>
                  </div>
                  <label className="text-gray-700 block font-medium ">
                    Category:
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      required
                    />
                  </label>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block font-medium text-gray-700"
                    >
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
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="id"
                      className="block font-medium text-gray-700"
                    >
                      ID:
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      required
                    />
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-10">
                      <BarLoader color="#4ADE80" />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                      Add Item
                    </button>
                  )}
                </form>
              </div>
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
          ) : role !== "Admin" ? (
            <NotAuth />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AddItems;
