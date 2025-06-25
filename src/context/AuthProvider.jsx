import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config"; // make sure this file is configured
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  // Register user
  const register = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //const idToken  = await user.getIdToken();

      // Send token to backend to generate JWT and set it in cookie
      // await axios.post(
      //   `https://srs-backend-3wa7.onrender.com/jwt`,
      //   { idToken },
      //   { withCredentials: true }
      // );

      return user;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken  = await user.getIdToken();

      // Send token to backend to generate JWT and set it in cookie
      // await axios.post(
      //   `https://srs-backend-3wa7.onrender.com/jwt`,
      //   { idToken  },
      //   { withCredentials: true }
      // );

      return user;
    } finally {
      setLoading(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get the Google ID token
      const idToken = await user.getIdToken();

      // Send to your backend to create JWT cookie
      // const response = await fetch("/jwt", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ idToken }),
      //   credentials: "include", // Important for cookies
      // });

      // Google Sign-In successful
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Function to get total user count (would need a backend API endpoint)
  const getTotalUserCount = async () => {
    try {
      // You would need to create an API endpoint that uses Firebase Admin SDK
      const response = await fetch("/api/users/count");
      const data = await response.json();
      setTotalUsers(data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };


  // checking jwt expire , invalid or not 
  useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        console.warn("JWT expired বা invalid। এখন logout করানো হচ্ছে...");
        logout(); // AuthProvider এর logout function
      }

      return Promise.reject(error);
    }
  );

  // Cleanup interceptor যখন component unmount হয়
  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, []);


  // Set user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      

      if (currentUser?.email) {
        currentUser.getIdToken().then((idToken) => {
          axios
            .post(
              "https://srs-backend-3wa7.onrender.com/jwt",
              { idToken },
              { withCredentials: true }
            )
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    totalUsers,
    getTotalUserCount,
    register,
    login,
    logout,
    signInWithGoogle,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
