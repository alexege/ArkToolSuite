// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHWrJ8W8JfEHS4x4yEmLVko8TusijYUBw",
    authDomain: "fir-authtemplate-19fbc.firebaseapp.com",
    projectId: "fir-authtemplate-19fbc",
    storageBucket: "fir-authtemplate-19fbc.appspot.com",
    messagingSenderId: "202551535382",
    appId: "1:202551535382:web:18f4db0baa6e85c25fd237"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };