
import  { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TextInput,Dimensions, Platform ,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressBar from '../../components/ProgressBar';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


 const BirthdayScreen = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const [birthdate, setBirthdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || birthdate;
      setBirthdate(currentDate);
    };
  
    const showDatePicker = () => {
      setShowPicker(true); // Показать модальное окно с DateTimePicker
    };
  
    const closeDatePicker = () => {
      setShowPicker(false); // Скрыть модальное окно
    };
  
    return (
        <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, position: 'relative', padding: 20 }}>
         <ProgressBar step={2} totalSteps={5} /> 
        <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>I am born on</Text>
  
        <TouchableOpacity onPress={showDatePicker} style={{ 
          borderBottomWidth: 2,
          width: width * 0.7,
          alignSelf: 'center',
          padding: 10,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 28 }}>
            {birthdate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
  
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={closeDatePicker} // Для кнопки "назад" на Android
        >
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20 }}>
              {Platform.OS === 'ios' && (
                <TouchableOpacity onPress={closeDatePicker} style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ fontSize: 18, color: 'blue' }}>Done</Text>
                </TouchableOpacity>
              )}
              <DateTimePicker
                value={birthdate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={onChange}
                maximumDate={new Date()} // Предотвращает выбор будущих дат
              />
              {Platform.OS === 'android' && (
                <Button title="Done" onPress={closeDatePicker} />
              )}
            </View>
          </View>
        </Modal>
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            left: (width - 200) / 2, // Center the button horizontally
            opacity: birthdate ? 1 : 0.5, // Adjust opacity based on input
          }}
          onPress={() => navigation.navigate('Gender')}
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
  

  export default BirthdayScreen;