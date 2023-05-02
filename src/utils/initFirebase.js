import {initializeApp,getApp,getApps} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3ZE5h4b4ILYisY0RRZ6XLnq4XwVg2uXY",
    authDomain: "waiterless-69375.firebaseapp.com",
    projectId: "waiterless-69375",
    storageBucket: "waiterless-69375.appspot.com",
    messagingSenderId: "365862733018",
    appId: "1:365862733018:web:cf4892ef18c6087a16d1e3"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {app,firestore,storage,auth};