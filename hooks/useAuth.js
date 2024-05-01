

import { createContext, useContext, useState } from 'react';
import { Text, View } from 'react-native'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext({


})

export const AuthProvider = ({children}) => {
   const[user,setUser] = useState(null);
   const[loading,setLoading] = useState(false)

   useEffect(() => {
    // При загрузке компонента, проверяем наличие сохраненного пользователя в AsyncStorage
    const fetchUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        // console.error('Error fetching user from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = async (newUser) => {
    try {
      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error updating user in AsyncStorage:', error);
    }
  };

  const createUserInStorage = async (user) => {
    try {
        console.log("createUserInStorage= "+user)
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Error creating user in AsyncStorage:', error);
    }
  };


   return (<AuthContext.Provider value={{user,setUser,loading,setLoading,updateUser,createUserInStorage }}>
    {children}

   </AuthContext.Provider>)


};

export default function useHookAuth(){
    return useContext(AuthContext);
}



