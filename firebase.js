// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { EmailAuthCredential, EmailAuthProvider } from "firebase/auth/cordova";
import { getFirestore ,serverTimestamp} from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNkGtxaUuQ5WPFFT_Y1pAL5s5D_sO-SAo",
  authDomain: "dyplom-6fa0e.firebaseapp.com",
  projectId: "dyplom-6fa0e",
  storageBucket: "dyplom-6fa0e.appspot.com",
  messagingSenderId: "549105404821",
  appId: "1:549105404821:web:c03da684f041d26a85449c",
  measurementId: "G-RZ0QPH0Q6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const timestamp = serverTimestamp();
const storage = getStorage(app);
export { app, auth, createUserWithEmailAndPassword ,db,storage,timestamp};

