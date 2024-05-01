


import * as React from 'react';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { LocationPermissionProvider } from './LocationPermissionContext';
import { Text ,View} from 'react-native';

function App() {
  return (
   
 
    <NavigationContainer>
        <LocationPermissionProvider>
        
             <StackNavigator/>
       
        </LocationPermissionProvider>
    </NavigationContainer>
    
     


  );
}

export default App;