// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { EmailAuthCredential, EmailAuthProvider } from "firebase/auth/cordova";
import { getFirestore ,serverTimestamp} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getApps , initializeApp,getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
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
let app,auth;
if(!getApps().length){
  try{
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app,{
      persistence:getReactNativePersistence(AsyncStorage  )
    })
    
  }catch(error){
    console.log("error initiliatian" + error);
  }
}else{
  app = getApp();
  auth = getAuth(app);
}



const db = getFirestore();
const timestamp = serverTimestamp();
const storage = getStorage(app);
export { app, auth, createUserWithEmailAndPassword ,db,storage,timestamp};

