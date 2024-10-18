import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.init";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Admin status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        checkAdminStatus(user); // Check admin status on auth change
      } else {
        setUser(null);
        setIsAdmin(false); // Reset admin status when logged out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkAdminStatus = (user) => {
    const adminEmail = import.meta.env.VITE_adminEmail?.toLowerCase().trim(); 
    const userEmail = user?.email?.toLowerCase().trim(); 
  
    console.log("Admin Email:", adminEmail); 
    console.log("User Email:", userEmail);   
  
    if (userEmail === adminEmail) {
      console.log("User is admin");
      setIsAdmin(true);
    } else {
      console.log("User is not admin");
      setIsAdmin(false);
    }
  };
  

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        checkAdminStatus(result.user); 
        setUser(result.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginUserWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      checkAdminStatus(result.user); // Check after Google login
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setIsAdmin(false); // Reset admin status on logout
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const userInfo = {
    user,
    isAdmin,
    loading,
    createUser,
    loginUser,
    loginUserWithGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
