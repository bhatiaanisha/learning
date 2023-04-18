import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyBV9VqOSgq68f4T5qR3bvgGqxA9wlLwKoI",
    authDomain: "woodenstreet-d6ff2.firebaseapp.com",
    projectId: "woodenstreet-d6ff2",
    storageBucket: "woodenstreet-d6ff2.appspot.com",
    messagingSenderId: "1033641163527",
    appId: "1:1033641163527:web:cdcc8e5746a07d0ee5e3a2",
    measurementId: "G-SRXEGGDTEM"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;