import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  deleteField,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { MdDeleteSweep } from "react-icons/md";

const UpdateItemForm = () => {
  const { user, role } = useAuth();

  if (typeof window !== "undefined") {
    var restaurantId = localStorage.getItem("restaurantId");
  }

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    dishName: "",
    price: "",
    rating: "",
    id: "",
    category: "",
    image:"",
    restaurantId:restaurantId
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!selectedItem) {
        // Handle the case when no item is selected
        return;
      }
  
      const { id, ...updatedData } = formData;
  
      // Update the item in the Firestore database
      const itemRef = doc(firestore, "Menu", restaurantId);
      await updateDoc(itemRef, {
        [`menu.${formData.id}`]: formData
      });
  
      // Update the local 'items' state with the updated item
      setItems((prevItems) => {
        const updatedItems = { ...prevItems };
        updatedItems[id] = { ...updatedItems[id], ...updatedData };
        return updatedItems;
      });
  
      // Show a success message or perform any additional actions
      alert("Item updated in the menu.");
  
      // Clear the form data and selected item state
      setFormData({
        dishName: "",
        price: "",
        rating: "",
        id: "",
        category: "",
      });
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      // Handle the error condition and show an error message
      alert("Error updating item. Please try again.");
    }
  };
  

  useEffect(() => {
    const fetchItems = async () => {
      const menuRef = doc(firestore, "Menu", restaurantId);
      const docSnapshot = await getDoc(menuRef);

      if (docSnapshot.exists()) {
        const menuData = docSnapshot.data().menu;
        setItems(menuData);
        console.log(items);
      } else {
        setItems([]);
      }
    };

    fetchItems();
  }, [restaurantId]);

  const handleSelectChange = (event) => {
    const itemId = event.target.value;
    const selectedItem = items[itemId];
  
    if (selectedItem) {
      setSelectedItem(selectedItem);
      setFormData({
        dishName: selectedItem.dishName,
        price: selectedItem.price,
        rating: selectedItem.rating,
        id: selectedItem.id,
        category: selectedItem.category,
        image:selectedItem.image,
        restaurantId:restaurantId,
      });
    } else {
      setSelectedItem(null);
      setFormData({
        dishName: '',
        price: '',
        rating: '',
        id: '',
        category: '',
      });
    }
  };
  

  const handleDelete = async () => {
    try {
      if (!selectedItem) {
        // Handle the case when no item is selected
        return;
      }
  
      // Delete the item from the Firestore database
      const itemRef = doc(firestore, "Menu", restaurantId);
      await updateDoc(itemRef, {
        [`menu.${selectedItem.id}`]: deleteField()
      });
  
      // Update the local 'items' state by removing the deleted item
      setItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[selectedItem.id];
        return updatedItems;
      });
  
      // Show a success message or perform any additional actions
      alert("Item deleted from the menu.");
  
      // Clear the form data and selected item state
      setFormData({
        dishName: "",
        price: "",
        rating: "",
        id: "",
        category: "",
      });
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle the error condition and show an error message
      alert("Error deleting item. Please try again.");
    }
  };
  

  return (
    <div className=" mx-auto md:pl-96">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Update Item</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mr-4">
          <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <label
              htmlFor="item-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Select an Item
            </label>
            <select
              id="item-select"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mb-2"
              onChange={handleSelectChange}
            >
              <option value="">Select an item</option>
              {Object.keys(items).map((itemId) => (
                <option key={itemId} value={itemId}>
                  {items[itemId].dishName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          {selectedItem && (
            <div>
              <div className="bg-white shadow-md rounded-md p-4 mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="dishName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Dish Name
                  </label>
                  <input
                    type="text"
                    id="dishName"
                    value={formData.dishName}
                    onChange={(e) =>
                      setFormData({ ...formData, dishName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>

                <div className="mb-4 space-x-2 flex flex-row">
                  <button
                    // type="submit"
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Update Item
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500  hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex flex-row  justify-center items-center"
                  >
                    <MdDeleteSweep className="text-xl " />{" "}
                    <span>Delete Items</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateItemForm;
