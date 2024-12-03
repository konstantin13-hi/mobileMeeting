import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstNameScreen from '../screens/SetUpForUser/FirstNameScreen'
import BirthdayScreen from '../screens/SetUpForUser/BirthdayScreen';
import GenderScreen from '../screens/SetUpForUser/GenderScreen';
import ShowMeScreen from '../screens/SetUpForUser/ShowMeScreen';
import PhotoScreen from '../screens/SetUpForUser/PhotoScreen';
import { ProfileProvider } from '../hooks/ProfileContext';

const Stack = createNativeStackNavigator();


function ProfileSetupStack() {
  return (
    <ProfileProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstName" component={FirstNameScreen} />
      <Stack.Screen name="Birthday" component={BirthdayScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="ShowMe" component={ShowMeScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
    </ProfileProvider>
  );
}

export default ProfileSetupStack;
