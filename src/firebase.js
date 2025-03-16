// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOErigwqHVOSDWuwdZtUhe6_4kG5I7Wro",
  authDomain: "csigame.firebaseapp.com",
  projectId: "csigame",
  storageBucket: "csigame.firebasestorage.app",
  messagingSenderId: "1056204497965",
  appId: "1:1056204497965:web:2cd0e49e8808fdb12504a4",
  measurementId: "G-SVQPW3BHCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
// src/components/firebase.js