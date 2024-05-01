import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import LocationPermission from './screens/LocationPermission'; // Импортируем ваш компонент

import {useLocationPermission} from './LocationPermissionContext';
import useHookAuth from './hooks/useAuth';


const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {user} = useHookAuth();
  // const { permissionType, setPermissionType, location } = useLocationPermission();
  console.log(user);
return(
  <Stack.Navigator >
  

{user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      

  </Stack.Navigator>
)

  // if (permissionType === 'never') {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Loc" component={LocationPermission} />
  //     </Stack.Navigator>
  //   );
  // } else {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="Chat" component={ChatScreen} />
  //     </Stack.Navigator>
  //   );
  // }
}

export default StackNavigator;



  {/* //     <Stack.Screen name="Home" component={HomeScreen} />
      //     <Stack.Screen name="Chat" component={ChatScreen} />
      //   </> */}
      {/* // ) : (
      //   <Stack.Screen name="Login" component={LoginScreen} />
      // )} */} 