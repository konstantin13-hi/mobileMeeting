
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  
    return (
        <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name = "Home" component={HomeScreen}  />  
        <Stack.Screen name = "Chat" component={ChatScreen} /> 

      </Stack.Navigator>
      </NavigationContainer>
    )
  
}

export default StackNavigator
