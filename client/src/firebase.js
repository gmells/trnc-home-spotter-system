// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trnchomespotter.firebaseapp.com",
  projectId: "trnchomespotter",
  storageBucket: "trnchomespotter.appspot.com",
  messagingSenderId: "561611077054",
  appId: "1:561611077054:web:338eb91b1a1137d5b435ef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
