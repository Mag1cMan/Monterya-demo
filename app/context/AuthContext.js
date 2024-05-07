import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import LoadingScreen from '../components/LoadingScreen.jsx';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true);

  let globalAuthHandler;

  const isAuthed = () => new Promise((resolve, reject) => {
    globalAuthHandler = resolve;
  })

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {


      //console.log("Curetn user" , currentUser);
      if(currentUser != null){
        setUser(currentUser);
        setLoading(false);
      }
      if(currentUser == null){
        setUser(null);
        setLoading(false);
      }    
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {loading ? <LoadingScreen/> : children}
    </AuthContext.Provider>

  
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};