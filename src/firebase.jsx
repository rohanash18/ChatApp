import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF5dG1Nh24Xh5fs9QEafADoxoXlKXUbJk",
  authDomain: "chat-c102f.firebaseapp.com",
  projectId: "chat-c102f",
  storageBucket: "chat-c102f.appspot.com",
  messagingSenderId: "463814100626",
  appId: "1:463814100626:web:68f989c741b96ff0b5c84b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);