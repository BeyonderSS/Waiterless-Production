import React, { useState, useEffect } from "react";
import { getDocs, collection, where, query, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/initFirebase"; // import your firestore instance
import { useAuth } from "@/context/AuthContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const UpdateItemForm = () => {

const {user , role}= useAuth();
 

 
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    var restaurantId = localStorage.getItem('restaurantId')
    
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
      const menuQuery =  query(itemsRef, where("restaurantId", "==",restaurantId));
      const querySnapshot = await getDocs(menuQuery);

      const menuData =querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setItems(menuData);
    };
    fetchItems();
  }, );
  const handleSelectChange = (event) => {
    const item = items.find((item) => item.id === event.target.value);
    setSelectedItem(item);
    console.log(item)
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
  
    // Read the image file from the input
  
  
    // Create a reference to the Firebase Storage location
   
    
        // On successful upload, get the download URL and update the state
  
        // Find the document with the specified ID in the Firestore database
        const itemsRef = collection(firestore, "Menu");
        const q = query(itemsRef, where("id", "==", formData.id));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Update the existing item
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
          image: null,
          rating: "",
          id: "",
          category: "",
        });
      }
  
  
  
  return (
    <>
      <select onChange={handleSelectChange}>
        <option value="">Select an item</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.dishName}
          </option>
        ))}
      </select>
      {selectedItem && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="dishName">Dish Name:</label>
          <input
            type="text"
            id="dishName"
            value={formData.dishName}
            onChange={(e) => setFormData({ ...formData, dishName: e.target.value })}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          {/* Add other form fields for image, rating, and category */}

          <button type="submit">Update Item</button>
        </form>
      )}
    </>
  );
};

export default UpdateItemForm;

