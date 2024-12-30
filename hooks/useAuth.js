

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const snapShot = await getDoc(doc(db, 'users', user.uid));
        if (!snapShot.exists()) {
          setIsProfileComplete(false); // Если профиль не завершен
        } else {
          setIsProfileComplete(true); // Если профиль завершен
        }
      } else {
        setUser(null);
        setIsProfileComplete(false);
      }
      setLoadingInitial(false);
    });

    return unsubscribe;
  }, []); // Пустой массив, чтобы эффекты сработали один раз при монтировании

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

