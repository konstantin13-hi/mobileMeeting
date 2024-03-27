


import * as React from 'react';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (

    <NavigationContainer>
          <AuthProvider>
      <StackNavigator/>
      </AuthProvider>
      </NavigationContainer>

     


  );
}

export default App;