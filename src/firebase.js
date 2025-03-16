// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence, collection, getDocs } from "firebase/firestore";

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
      if (err.code === 'failed-precondition') {
        console.warn("Firebase persistence error: Multiple tabs open. Persistence can only be enabled in one tab at a time.");
      } else if (err.code === 'unimplemented') {
        console.warn("Firebase persistence error: Current browser does not support offline persistence");
      } else {
        console.warn("Firebase persistence error:", err.code, err.message);
      }
    });

  // Test database access to check permissions
  const testCollection = collection(db, "test_permissions");
  getDocs(testCollection)
    .then(() => {
      console.log("Firebase permissions verified successfully");
    })
    .catch((error) => {
      console.error("Firebase permissions error:", error.code, error.message);
      if (error.code === 'permission-denied') {
        console.error("Please check your Firestore security rules. Your application doesn't have permission to access the database.");
      }
    });

  console.log("Firebase setup completed");
} catch (error) {
  console.error("Firebase initialization error:", error.code, error.message);
}

// Export the Firebase instances (at the top level)
export { app, analytics, db };

