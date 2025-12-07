import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeFWTtLN1zVHfLrhfLTluwtFSvgzPmQUU",
  authDomain: "smart-rentwheel.firebaseapp.com",
  projectId: "smart-rentwheel",
  storageBucket: "smart-rentwheel.firebasestorage.app",
  messagingSenderId: "794502878696",
  appId: "1:794502878696:web:0649bf4c218640d339405d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);