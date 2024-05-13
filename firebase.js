// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { EmailAuthCredential, EmailAuthProvider } from "firebase/auth/cordova";
import { getFirestore ,serverTimestamp} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpQIgw0MPye5mj4uh_1-e35EJplgCZZuo",
  authDomain: "fffffff-704ec.firebaseapp.com",
  projectId: "fffffff-704ec",
  storageBucket: "fffffff-704ec.appspot.com",
  messagingSenderId: "420111812837",
  appId: "1:420111812837:web:eef5913a865a09aa5a2c0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const timestamp = serverTimestamp();
export { app, auth, createUserWithEmailAndPassword ,db,timestamp};

