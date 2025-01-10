

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

// Создание контекста
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [photos, setPhotos] = useState([]); // Добавляем массив фото
  console.log("authProvider ="+user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("firebaseUser"+JSON.stringify(firebaseUser, null, 2));
        setUser(firebaseUser);

        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          console.log("userDocSnap"+userDocSnap);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("USERdATA"+userData)

            // Сохраняем фото в контекст
            setPhotos(userData.photos || []);
            setUser({ ...firebaseUser, ...userData });
            setIsProfileComplete(true);
            ///
          } else {
            setIsProfileComplete(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setIsProfileComplete(false);
        setPhotos([]); // Очищаем фото, если пользователь вышел
      }
      setLoadingInitial(false);
    });

    return unsubscribe;
  }, [isProfileComplete]); // Пустой массив, чтобы эффекты сработали один раз при монтировании

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsProfileComplete(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ logout, user, setUser, loading, setLoading, loadingInitial, setLoadingInitial, isProfileComplete, setIsProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для доступа к контексту
export default function useHookAuth() {
  return useContext(AuthContext);
}

