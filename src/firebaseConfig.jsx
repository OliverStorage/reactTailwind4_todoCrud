import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQaRAj_rAa6bLPkABvY87HSlRF0LZ3WzU",
    authDomain: "todocrudtw4.firebaseapp.com",
    projectId: "todocrudtw4",
    storageBucket: "todocrudtw4.firebasestorage.app",
    messagingSenderId: "117885320418",
    appId: "1:117885320418:web:bd9cf217c74ecdc7ea32bb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default {app ,db}