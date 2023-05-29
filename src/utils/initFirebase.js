import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM8PVBbtiFXUSm7e5C7Ir_1UUK8ToPleg",
  authDomain: "waiterlessproduction.firebaseapp.com",
  projectId: "waiterlessproduction",
  storageBucket: "waiterlessproduction.appspot.com",
  messagingSenderId: "6825791082",
  appId: "1:6825791082:web:3a241bd1f8d9036b4dc413",
  measurementId: "G-6C3MH8SML2",
};

// test ignore 3
// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
