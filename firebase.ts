
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBke0hxSMibzSX1RZKi9VoLPWYEQh3iKLI",
  authDomain: "eduvest-f4326.firebaseapp.com",
  projectId: "eduvest-f4326",
  storageBucket: "eduvest-f4326.firebasestorage.app",
  messagingSenderId: "325434971700",
  appId: "1:325434971700:web:ec1275de00cb1e7f141c61",
  measurementId: "G-L7P5R6DLZ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
