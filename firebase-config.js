// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore, initializeFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMouf6AW3-8aQLW4ksHiyI2RRX5KOb1-M",
  authDomain: "clone-ef5a4.firebaseapp.com",
  projectId: "clone-ef5a4",
  storageBucket: "clone-ef5a4.appspot.com",
  messagingSenderId: "890132130406",
  appId: "1:890132130406:web:cf9e04c6ba1cb223f51ba7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=initializeFirestore(app, {
  experimentalForceLongPolling: true,
});