// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyDIVZ_7hgXgmBGpECvBpguOV8JeXtdGQC8",
  authDomain: "byananyas.firebaseapp.com",
  projectId: "byananyas",
  storageBucket: "byananyas.firebasestorage.app",
  messagingSenderId: "502571243737",
  appId: "1:502571243737:web:c321e519c8fdf2388106c8",
  measurementId: "G-ZY9D3BJFC1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ✅ Make sure this works after import