import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import LocationPermission from './screens/LocationPermission'; // Импортируем ваш компонент
import useAuth from './hooks/useAuth';
import {useLocationPermission} from './LocationPermissionContext';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const user = useAuth();
  const { permissionType, setPermissionType, location } = useLocationPermission();
  console.log("stack type " + permissionType);
  console.log("stack locat " + location);

  if (permissionType === 'never') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Loc" component={LocationPermission} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;



  {/* //     <Stack.Screen name="Home" component={HomeScreen} />
      //     <Stack.Screen name="Chat" component={ChatScreen} />
      //   </> */}
      {/* // ) : (
      //   <Stack.Screen name="Login" component={LoginScreen} />
      // )} */} 