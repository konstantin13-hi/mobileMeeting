
import { Button, View, Text, TouchableOpacity, TextInput,Dimensions, Platform ,Modal} from 'react-native';
import * as React from 'react';
import ProgressBar from '../../components/ProgressBar';

import { SafeAreaView } from 'react-native-safe-area-context';
const ShowMeScreen = ({ route, navigation }) =>{
    const { width } = Dimensions.get('window');
    const { selectedGender } = route.params;
  
    // Здесь переменная isContinueEnabled не нужна, так как не предполагается
    // никакого дополнительного контроля активности кнопки
  
    return (
        <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,padding:20}}>
         <ProgressBar step={4} totalSteps={5} /> 
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          You want to find: {selectedGender === 'MAN' ? 'Man' : 'Woman'}
        </Text>
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            left: (width - 200) / 2, // Center the button horizontally
            // Опция кнопки должна быть активной всегда в этом случае
          }}
          onPress={() => {
            // Перенаправление на другой экран или выполнение какого-либо действия
            navigation.navigate('Photo'); 
          }}
        >
          <View
            style={{
              height: 50,
              width: 200,
              borderRadius: 10,
              backgroundColor: 'red',
              padding: 10,
              marginBottom: 10,
              alignItems: 'center', // Center text horizontally
              justifyContent: 'center', // Center text vertically
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }



export default ShowMeScreen;
