// context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../src/utils/initFirebase";
import { useContext } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null); // add new state variable
  const [displayName, setDisplayName] = useState(null);
  const [university, setUniversity] = useState(null); // add new state variable

  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = getCookie("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

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
            const docRef = await addDoc(collection(firestore, "users"), {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: "User",
            });
            console.log("Document written with ID: ", docRef.id);
            setRole("User");
            router.push("/");
          } else {
            querySnapshot.forEach((doc) => {
              const role = doc.data().role;
              const displayName = doc.data().displayName;
              setDisplayName(displayName);
              setRole(role);
             
            });
          }
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
      }
    }
    handleDB();
  }, [user,router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Set response_type and access_type parameters
    provider.setCustomParameters({
      response_type: "code", // Specify the response type as "code"
      access_type: "offline", // Specify the access type as "offline" to get a refresh token
    });

    // Add desired scopes
    provider.addScope(
      "openid email profile"
    );

    try {
      const result = await signInWithRedirect(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      setAccessToken(accessToken);
      const loginTime = Date.now();
      localStorage.setItem("loginTime", loginTime.toString());
      // Store access token in cookies
      document.cookie = `accessToken=${accessToken}; path=/;`;
      // const courseData = {
      //   name: "test",
      //   section: "CS101",
      //   description: "An introductory course on computer science",
      //   room: "Room 101",
      //   ownerId: "me",
      // };

      const user = result.user;
      const refreshToken = user.refreshToken;

      handledb(user);
      // createCourseWithAccessToken(accessToken, courseData);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      setAccessToken(null);
      localStorage.removeItem("loginTime");
      // Remove access token from cookies
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Helper function to get cookie value
  const getCookie = (name) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(`${name}=`.length, cookie.length);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        university,
        accessToken,
        role,
        displayName,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
