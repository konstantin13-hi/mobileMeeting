
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  
  const user = true;
    return (
        <NavigationContainer>

   
      <Stack.Navigator>
      {user ? (
        <>
     
        <Stack.Screen name = "Home" component={HomeScreen}  />  
        <Stack.Screen name = "Chat" component={ChatScreen} /> 
        </>):(
        <Stack.Screen name = "Login" component={LoginScreen} /> )}


      </Stack.Navigator>
      </NavigationContainer>
    )
  
}

export default StackNavigator
