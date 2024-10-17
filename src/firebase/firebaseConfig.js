// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyAI2PYSZNtbkg9wsaPBAtU5NLPwFG8fw-A",
    authDomain: "system-for-decoration.firebaseapp.com",
    projectId: "system-for-decoration",
    storageBucket: "system-for-decoration.appspot.com",
    messagingSenderId: "11653410112",
    appId: "1:11653410112:web:1e2d9bff1295eb1a091ea5",
    measurementId: "G-YKCQYG1QYQ"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
