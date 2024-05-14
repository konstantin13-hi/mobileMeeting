

import React, { Component, useContext, useState } from 'react'
import { Button, Text, View ,TouchableOpacity,Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, TextInput,Input} from 'react-native';
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import useHookAuth, {AuthContext} from "../hooks/useAuth"

export default function LoginScreen()  {
  // const[type,setType] = useState(2);
  // const[name,SetName]= useState(null);
  // const[mail,SetMail] = useState(null);
  // const[password,SetPasword] = useState(null);

  const [type, setType] = useState(1);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const {createUserInStorage } = useHookAuth();
  const { loading, setLoading } = useHookAuth();

  



    // Функция для обработки изменений в поле ввода имени
    const handleNameChange = (text) => {
      setName(text);
    };
  
    // Функция для обработки изменений в поле ввода почты
    const handleMailChange = (text) => {
      setMail(text);
    };
  
    // Функция для обработки изменений в поле ввода пароля
    const handlePasswordChange = (text) => {
      setPassword(text);
    };


    const signUp = async () => {
      if (name.trim() === "" || mail.trim() === "" || password.trim() === "") {
        return Alert.alert("Ohhh!!", "You have not entered all details");
      }
      try {
         createUserWithEmailAndPassword(auth, mail, password)
        .then(({ user }) => {
          updateProfile(user, { displayName: name });
     
      })
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      }
    };

    const signIn = () => {
      if (mail.trim() === "" || password.trim === "") {
        return Alert.alert("Ohhh!!", "You have not entered all details");
      }
      setLoading(true);
  
      signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    if (loading) {
      return (
        <View  className="flex-1 justify-center items-center">
          <Text className="font-semibold text-red-400 text-2xl">
            Loading....
          </Text>
        </View>
      );
    }

return (

  type === 1 ? (
          <View className="flex-1 items-center justify-center">
          <Text>Sing in</Text>
          

          <TextInput 
      value={mail} 
      onChangeText={handleMailChange} 
      placeholder="Enter your email" 
      className="border-solid border-2 
          border-indigo-600 rounded-full w-3/5  px-2 m-5 py-2  />"></TextInput>
    <TextInput 
      value={password} 
      onChangeText={handlePasswordChange} 
      placeholder="Enter your password" 
      className="border-solid border-2
       border-indigo-600 rounded-full w-3/5 px-2 py-2  " 
        secureTextEntry={true}
    />

        

<TouchableOpacity    onPress={() => signIn(mail, password)}
        className="
       bg-indigo-600 rounded-full w-3/5 px-2 py-2  m-5 ">
      <Text className="text-center text-white solid font-bold">Log in</Text>
    </TouchableOpacity>

    <Button 
       title="Sign Up" 
       onPress={() => {
         setType(2);
       }}
     />
          
   </View>
      
   



        ):(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{type === 1 ? 'Sign in' : 'Sign Up'}</Text>
    
    {/* Поля ввода для имени, почты и пароля */}
    <TextInput 
      value={name} 
      onChangeText={handleNameChange} 
      placeholder="Enter your name" 
      className="border-solid border-2 
              border-indigo-600 rounded-full w-3/5  px-2 mt-5 py-2"
    />
    <TextInput 
      value={mail} 
      onChangeText={handleMailChange} 
      placeholder="Enter your email" 
      className="border-solid border-2 
          border-indigo-600 rounded-full w-3/5  px-2 m-5 py-2  />"></TextInput>
    <TextInput 
      value={password} 
      onChangeText={handlePasswordChange} 
      placeholder="Enter your password" 
      className="border-solid border-2
       border-indigo-600 rounded-full w-3/5 px-2 py-2    secureTextEntry={true}"
    />

    {/* Кнопка для регистрации */}
    <Button 
      title="Registration"
      color="#2196F3"
      onPress={signUp}
    />
    
    {/* Подсказка для регистрации */}
    <Text>{type === 2 && (!name || !mail || !password) ? 'Please enter all fields to register' : null}</Text>
    
    {/* Кнопка "back" для возвращения к форме входа */}
    <Button 
      title="Back" 
      onPress={() => {
        setType(1);
      }}
    />
  </View>)
);

}


