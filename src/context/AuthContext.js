import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../utils/initFirebase";
import { useContext } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime && Date.now() - parseInt(loginTime) > 3600000) {
        signInWithGoogle();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      unsubscribe();
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    async function handleDB() {
      if (user) {
        const usersRef = query(
          collection(firestore, "users"),
          where("email", "==", user.email)
        );
        try {
          const querySnapshot = await getDocs(usersRef);
          if (querySnapshot.size === 0) {
            const restaurantsRef = collection(firestore, "Restaurants");
            const restaurantsSnapshot = await getDocs(restaurantsRef);
            let role = "User";
            let restaurantId = null;
            restaurantsSnapshot.forEach((doc) => {
              if (doc.data().adminEmail === user.email) {
                role = "Admin";
                restaurantId = doc.data().id;
              }
            });
            const docRef = await addDoc(collection(firestore, "users"), {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: role,
              restaurantId: restaurantId,
            });
            console.log("Document written with ID: ", docRef.id);
            setRole(role);
            setRestaurantId(restaurantId);
            router.push("/");
          } else {
            querySnapshot.forEach((doc) => {
              const role = doc.data().role;
              const displayName = doc.data().displayName;
              const restaurantId = doc.data().restaurantId;
              setDisplayName(displayName);
              setRole(role);
              setRestaurantId(restaurantId);
            });
          }
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
      }
    }

    handleDB();
  }, [user, router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Set response_type parameter
    provider.setCustomParameters({
      response_type: "code",
    });

    // Add desired scopes
    provider.addScope("openid email profile");

    try {
      const result = await signInWithRedirect(auth, provider);
      const user = result.user;
      const loginTime = Date.now();
      localStorage.setItem("loginTime", loginTime.toString());
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
