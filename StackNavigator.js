import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,TransitionPresets } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import LocationPermission from './screens/LocationPermission'; // Импортируем ваш компонент

import {useLocationPermission} from './LocationPermissionContext';
import useHookAuth from './hooks/useAuth';
import MessageScreen from './screens/MessageScreen';
import ModalScreen from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';
import Account from './screens/Account';



const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {user} = useHookAuth();
  // const { permissionType, setPermissionType, location } = useLocationPermission();
  console.log(user);
return(
  <Stack.Navigator 
  screenOptions={{headerShown:false}}>
  

{user ? (
      <>
        <Stack.Group >
             <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }}/>
              <Stack.Screen name="Message" component={MessageScreen} />
              <Stack.Screen name="Account" component={Account} options={{ headerShown: true }}/>
        </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
           <Stack.Screen name="Modal" component={ModalScreen} />

     </Stack.Group>

     <Stack.Group >
    <Stack.Screen name="Match" component={MatchScreen}/>
    </Stack.Group>
     </>

       
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      

  </Stack.Navigator>
  
)

}

export default StackNavigator;



  {/* //     <Stack.Screen name="Home" component={HomeScreen} />
      //     <Stack.Screen name="Chat" component={ChatScreen} />
      //   </> */}
      {/* // ) : (
      //   <Stack.Screen name="Login" component={LoginScreen} />
      // )} */} 


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