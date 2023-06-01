import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../utils/initFirebase";
import { useContext } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [restaurantId, setRestaurantId] = useState();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });

    // Check login time when navigating to the site
    const handleRouteChange = (url) => {
     
        signInWithGoogle();
      
    };


    return () => {
      unsubscribe();
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    async function handleDB() {
      if (user) {
        const userRef = doc(collection(firestore, "users"), user.email);
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          const restaurantRef = doc(collection(firestore, "Restaurants"), user.email);
          const restaurantSnapshotPromise = getDoc(restaurantRef);
          let role = "User";
          let restaurantId = null;
  
          const restaurantSnapshot = await restaurantSnapshotPromise;
          console.log(restaurantSnapshot.data())
          if (restaurantSnapshot.exists()) {
            role = "Admin";
            const restaurantData = restaurantSnapshot.data();
            if (restaurantData.hasOwnProperty("id")) {
              restaurantId = restaurantData.id;
            }
          }
          
  
          try {
            const docRef = await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: role,
              restaurantId: restaurantId,
            });
            console.log("Document written with ID: ", userSnapshot.id);
            setRole(role);
            setRestaurantId(restaurantId);
            // router.push("/");
          } catch (error) {
            console.log("Error creating user document: ", error);
          }
        } else {
          const role = userSnapshot.data().role;
          const displayName = userSnapshot.data().displayName;
          const restaurantId = userSnapshot.data().restaurantId;
          setDisplayName(displayName);
          setRole(role);
          setRestaurantId(restaurantId);
          localStorage.setItem("restaurantId", restaurantId);
        }
      }
    }
  
    handleDB();
  }, [user]);
  
  
  
  
  

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Set response_type parameter
    provider.setCustomParameters({
      response_type: "code",
    });

    // Add desired scopes
    provider.addScope("openid email profile");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    
      handledb(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      localStorage.removeItem("loginTime");
      localStorage.removeItem("restaurantId");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        displayName,
        restaurantId,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
