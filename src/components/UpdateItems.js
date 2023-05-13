import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../utils/initFirebase";
import { useAuth } from "@/context/AuthContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
  });

  useEffect(() => {
    const fetchItems = async () => {
      const itemsRef = collection(firestore, "Menu");
      const menuQuery = query(
        itemsRef,
        where("restaurantId", "==", restaurantId)
      );
      const querySnapshot = await getDocs(menuQuery);

      const menuData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(menuData);
    };
    fetchItems();
  }, []);

  const handleSelectChange = (event) => {
    const item = items.find((item) => item.id === event.target.value);
    setSelectedItem(item);
    setFormData({
      dishName: item.dishName,
      price: item.price,
      rating: item.rating,
      id: item.id,
      category: item.category,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const itemsRef = collection(firestore, "Menu");
    const q = query(itemsRef, where("id", "==", formData.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(firestore, "Menu", querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        dishName: formData.dishName,
        price: formData.price,
        rating: formData.rating,
        id: formData.id,
        category: formData.category,
        restaurantId: restaurantId,
      });

      alert("Item updated in the menu.");
    } else {
      alert("No item found with the specified ID.");
    }

    setFormData({
      dishName: "",
      price: "",
      rating: "",
      id: "",
      category: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
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
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.dishName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          {selectedItem && (
            <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Update Item
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateItemForm;
