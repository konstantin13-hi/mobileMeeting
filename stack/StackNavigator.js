import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,TransitionPresets } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import LocationPermission from '../screens/LocationPermission'; // Импортируем ваш компонент

import {useLocationPermission} from '../LocationPermissionContext';
import useHookAuth from '../hooks/useAuth';
import MessageScreen from '../screens/MessageScreen';
import ModalScreen from '../screens/ModalScreen';
import MatchScreen from '../screens/MatchScreen';
import Account from '../screens/Account';
import Language from '../screens/Language';
import UserProfile from '../screens/UserProfile';
import SplashScreen from '../components/SplashScreen';
import { useState,useEffect } from 'react';
import { ActivityIndicator } from 'react-native';


import ProfileSetupStack from './ProfileSetupStack';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const { user, isProfileComplete ,loadingInitial} = useHookAuth();
  // const { permissionType, setPermissionType, location } = useLocationPermission();
  // console.log(user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация проверки состояния авторизации и профиля
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Замените на реальную проверку
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loadingInitial ? (
             <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />
        ) : user ? (
            isProfileComplete ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                        <Stack.Screen name="Message" component={MessageScreen} />
                        <Stack.Screen name="UserProfile" component={UserProfile} />
                        <Stack.Screen name="Account" component={Account} options={{ headerShown: true }} />
                        <Stack.Screen name="Language" component={Language} options={{ headerShown: true }} />
                    </Stack.Group>

                    <Stack.Group >
                        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: true }}/>
                    </Stack.Group>

                    <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                        <Stack.Screen name="Match" component={MatchScreen} />
                    </Stack.Group>
                </>
            ) : (
                <Stack.Screen name="ProfileSetup" component={ProfileSetupStack} />
            )
        ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
        )}
    </Stack.Navigator>
  );

}

export default StackNavigator;
