

import  { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TextInput,Dimensions, Platform ,Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as React from 'react';


import ProgressBar from '../../components/ProgressBar';


const GenderScreen = ({ navigation }) =>{
    const { width } = Dimensions.get('window');
    const [selectedGender, setSelectedGender] = useState(null);
  
    // Функция для обработки выбора пола
    const selectGender = (gender) => {
      setSelectedGender(gender);
    };
  
    // Функция для проверки, активна ли кнопка "Continue"
    const isContinueEnabled = selectedGender !== null;
  
    return (
        <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, position: 'relative', padding: 20 }}>
         <ProgressBar step={3} totalSteps={5} /> 
        <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>I am ...</Text>
  
        <TouchableOpacity 
          onPress={() => selectGender('MAN')} 
          disabled={selectedGender === 'MAN'}
          style={{
            height: 50,
            borderRadius: 25,
            backgroundColor: selectedGender === 'MAN' ? 'red' : 'gray',
            padding: 10,
            marginBottom: 10,
            marginHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>MAN</Text>
        </TouchableOpacity>
  
        <TouchableOpacity 
          onPress={() => selectGender('WOMAN')} 
          disabled={selectedGender === 'WOMAN'}
          style={{
            height: 50,
            borderRadius: 25,
            backgroundColor: selectedGender === 'WOMAN' ? 'red' : 'gray',
            padding: 10,
            marginBottom: 10,
            marginHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>WOMAN</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            left: (width - 200) / 2, // Center the button horizontally
            opacity: isContinueEnabled ? 1 : 0.5, // Adjust opacity based on input
          }}
          onPress={() => {
            if (isContinueEnabled) {
              navigation.navigate('ShowMe', { selectedGender }); // Передача выбранного пола
            }
          }}
          disabled={!isContinueEnabled} // Disable button if no gender selected
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

  export default GenderScreen;