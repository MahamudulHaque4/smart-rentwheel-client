// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeFWTtLN1zVHfLrhfLTluwtFSvgzPmQUU",
  authDomain: "smart-rentwheel.firebaseapp.com",
  projectId: "smart-rentwheel",
  storageBucket: "smart-rentwheel.firebasestorage.app",
  messagingSenderId: "794502878696",
  appId: "1:794502878696:web:0649bf4c218640d339405d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);