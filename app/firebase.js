// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD5WfR4rEjf0bVypUULQB9umShw-d1pQXk",
//   authDomain: "monteryaweb.firebaseapp.com",
//   databaseURL: "https://monteryaweb-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "monteryaweb",
//   storageBucket: "monteryaweb.appspot.com",
//   messagingSenderId: "470604153637",
//   appId: "1:470604153637:web:d1faba1fe14e244db550cc",
//   measurementId: "G-ZZB9HZGGY8"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDNZyu7_hcKdeeLsNbzIa_SGW3qOQe9Nec",
  authDomain: "monterya-firestore.firebaseapp.com",
  projectId: "monterya-firestore",
  storageBucket: "monterya-firestore.appspot.com",
  messagingSenderId: "817830792193",
  appId: "1:817830792193:web:aa7ad8beb876f4b9b3c400",
  measurementId: "G-XWYLZ68WVP"
};



// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth();

// Get Firestore instance
const db = getFirestore();

export { app, auth, db };