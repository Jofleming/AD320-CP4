// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVnBiH9i_hHuS9Hp_3XyaO-ONIuaEf09g",
    authDomain: "hotel-registration-app.firebaseapp.com",
    projectId: "hotel-registration-app",
    storageBucket: "hotel-registration-app.firebasestorage.app",
    messagingSenderId: "988421256551",
    appId: "1:988421256551:web:1b8da591ba47aed2aeebc2",
    measurementId: "G-BB352F9PNE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };