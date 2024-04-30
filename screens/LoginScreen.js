

import React, { Component, useState } from 'react'
import { Button, Text, View ,TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, TextInput,Input} from 'react-native';

export default function LoginScreen()  {
  // const[type,setType] = useState(2);
  // const[name,SetName]= useState(null);
  // const[mail,SetMail] = useState(null);
  // const[password,SetPasword] = useState(null);

  const [type, setType] = useState(2);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');


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


 
//   return (
//     type === 1 ? (
//       <View className="flex-1 items-center justify-center">
//       <Text>Sing in</Text>
//       <StatusBar style="auto" />
//     </View>
//     ) : (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text className="text-blue-600">Sing Up</Text>
//         <Text style={{ color: 'blue' }}>create a new Account</Text>

//         <TextInput value ={name==true ? "name":name} onChange={text =>setType(text)} type ="text" className="border-solid border-2 
//         border-indigo-600 rounded-full w-3/5  px-2 m-5 py-2"></TextInput>
//         <TextInput type="mail" className="border-solid border-2
//         border-indigo-600 rounded-full w-3/5 mb-5 px-2 py-2">mail</TextInput>

// <TextInput className="border-solid border-2
//         border-indigo-600 rounded-full w-3/5 px-2 py-2">password</TextInput>

// <Button 
//       title="Registration"
//       color="#2196F3"
//       onPress={() => {
//         setType(1)
//       }}
//     >
//       <Text>Registration</Text>
//     </Button>
//         <Text>back</Text>
//       </View>
//     )
//   );

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

        

<TouchableOpacity className="
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
      onPress={() => {
        setType(1);
      }}
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


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

