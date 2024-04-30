


import * as React from 'react';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { LocationPermissionProvider } from './LocationPermissionContext';
import { Text ,View} from 'react-native';
import CheckPage from './CheckPage';
function App() {
  return (
   
 
    <NavigationContainer>
        <LocationPermissionProvider>
          <AuthProvider>
             <StackNavigator/>
           </AuthProvider>
        </LocationPermissionProvider>
    </NavigationContainer>
    
     


  );
}

export default App;