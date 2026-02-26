// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvbHgKzTk_N29c3jnHjeaZaVwOuY5IjmQ",
  authDomain: "gmax-foods.firebaseapp.com",
  projectId: "gmax-foods",
  storageBucket: "gmax-foods.firebasestorage.app",
  messagingSenderId: "735341462584",
  appId: "1:735341462584:web:59f36fc18b03d2ac7712cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export {app,auth}