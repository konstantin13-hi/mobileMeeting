import  { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TextInput,Dimensions, Platform ,Modal} from 'react-native';

import ProgressBar from '../../components/ProgressBar';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/ProfileContext';



const FirstNameScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName || '');
  

  const handleContinue = () => {
    setProfile({ ...profile, firstName });
    navigation.navigate('Birthday');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, position: 'relative' ,padding:20}}>
        <ProgressBar step={1} totalSteps={5} />
      <Text style={{ textAlign: 'center' ,fontSize:30 }}>My first name is </Text>

      <TextInput
        style={{
          fontSize: 28,
          borderBottomWidth: 2,
          width: width * 0.7, // Occupies 70% of screen width
          alignSelf: 'center',
        }}
        value={firstName}
        onChangeText={setFirstName} // Update state when text changes
      />

<TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          left: (width - 200) / 2, // Center the button horizontally
          opacity: firstName ? 1 : 0.5, // Adjust opacity based on input
        }}
        onPress={handleContinue}
        disabled={!firstName} // Disable button if no input
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

export default FirstNameScreen;