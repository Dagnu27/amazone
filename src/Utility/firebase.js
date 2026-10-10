// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore"; 
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO5ZzSDiHx4NasPb6VYk-J61Kqe23x9n8",
  authDomain: "e-37228.firebaseapp.com",
  projectId: "e-37228",
  storageBucket: "e-37228.firebasestorage.app",
  messagingSenderId: "638291056582",
  appId: "1:638291056582:web:fa3ec7604cf74c1cd184c7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();