// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDvehYBvDMb3J2mSZxnNnnKYUiqGkGa07w",
    authDomain: "osama-erp.firebaseapp.com",
    projectId: "osama-erp",
    storageBucket: "osama-erp.appspot.com",
    messagingSenderId: "622924401754",
    appId: "1:622924401754:web:c03beb567177418c1b5c63",
    measurementId: "G-NSMXZLX24F"
  };
  

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
