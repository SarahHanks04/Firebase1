import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDp-VicJgATE2PIEDg9CfeeLTCiwwwDbas",
  authDomain: "echohub-form.firebaseapp.com",
  projectId: "echohub-form",
  storageBucket: "echohub-form.firebasestorage.app",
  messagingSenderId: "93743200642",
  appId: "1:93743200642:web:8620ef82db2972172fb79b",
  measurementId: "G-7T7064WPM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);