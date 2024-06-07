
import { initializeApp } from "firebase/app";
console.log("hi", import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY, 
    authDomain: "mern-elearn.firebaseapp.com",
    projectId: "mern-elearn",
    storageBucket: "mern-elearn.appspot.com",
    messagingSenderId: "424925578479",
    appId: "1:424925578479:web:c9ba16c8c93d3a4407071a",
    measurementId: "G-ZHDXNYTH1S"
};
export const app = initializeApp(firebaseConfig);
