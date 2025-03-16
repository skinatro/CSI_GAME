// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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

console.log("Initializing Firebase...");
// Initialize Firebase with default null values
let app = null;
let analytics = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  db = getFirestore(app);
  
  console.log("Firebase initialized successfully");
  
  // Enable offline persistence if needed
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("Firebase persistence enabled");
    })
    .catch((err) => {
      console.warn("Firebase persistence error:", err.code);
    });

  console.log("Firebase setup completed");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Export the Firebase instances (at the top level)
export { app, analytics, db };