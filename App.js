
// import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// export default function App() {
//   return (
//   <View className="flex-1 items-center justify-center ">
//       <Text className="text-red-500">Osdadsada!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// In App.js in a new project


import * as React from 'react';
import StackNavigator from './StackNavigator';

function App() {
  return (
  <StackNavigator/>
  );
}

export default App;