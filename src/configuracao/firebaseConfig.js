// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEL-lL4a81pvLtKEUxGwIE8z9LwjrgxAg",
  authDomain: "react-native-app-f624f.firebaseapp.com",
  projectId: "react-native-app-f624f",
  storageBucket: "react-native-app-f624f.firebasestorage.app",
  messagingSenderId: "768475918099",
  appId: "1:768475918099:web:b12198b04582f092bef4e6",
  measurementId: "G-KBMMXHW4T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);