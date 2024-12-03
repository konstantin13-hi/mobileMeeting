

import { createContext, useContext, useState } from 'react';
import { Text, View } from 'react-native'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { db, timestamp } from "../firebase";

const AuthContext = createContext({


})

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();
   const[user,setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [loadingInitial, setLoadingInitial] = useState(true);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    console.log("user_id= "+ user?.uid);

    // useEffect(() => {
    //   if (user && !loadingInitial && navigation.isReady()) { 
    //     const checkUserProfile = async () => {
    //       try {
    //         const snapShot = await getDoc(doc(db, "users", user.uid));
    //         if (!snapShot.exists()) {
    //           navigation.navigate("FirstName");
    //         } else {
    //           setIsProfileComplete(true);
    //         }
    //       } catch (error) {
    //         console.error("Error checking user profile:", error);
    //       }
    //     };
    
    //     checkUserProfile();
    //   }
    // }, [user, loadingInitial, navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const snapShot = await getDoc(doc(db, "users", user.uid));
        if (!snapShot.exists()) {
          navigation.navigate("FirstName");
        } else {
          setIsProfileComplete(true);
        }
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // const updateUser = async (newUser) => {
  //   try {
  //     setUser(newUser);
  //     await AsyncStorage.setItem('user', JSON.stringify(newUser));
  //   } catch (error) {
  //     console.error('Error updating user in AsyncStorage:', error);
  //   }
  // };

  // const createUserInStorage = async (user) => {
  //   try {
  //       console.log("createUserInStorage= "+user)
  //     await AsyncStorage.setItem('user', JSON.stringify(user));
  //     setUser(user);
  //   } catch (error) {
  //     console.error('Error creating user in AsyncStorage:', error);
  //   }
  // };

  const logout = async () => {
    try {
      // Выполняем выход пользователя из Firebase
      await signOut(auth);
      
      // Удаляем пользователя из состояния приложения
      setUser(null);
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };



   return (<AuthContext.Provider value={{logout,user,setUser,loading,setLoading,loadingInitial, setLoadingInitial,isProfileComplete,setIsProfileComplete}}>
    {children}

   </AuthContext.Provider>)


};

export default function useHookAuth(){
    return useContext(AuthContext);
}



