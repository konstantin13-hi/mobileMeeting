import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

const BirthdayScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile();
  const [birthdate, setBirthdate] = useState(profile.birthDate || new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setBirthdate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const closeDatePicker = () => {
    setShowPicker(false);
  };

  const handleContinue = () => {
    setProfile({ ...profile, birthDate: birthdate });
    navigation.navigate('Gender');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b263b' }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        {/* Прогресс-бар */}
        <ProgressBar step={2} totalSteps={5} />

        {/* Кнопка назад */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={34} color="#ffc107" />
        </TouchableOpacity>

        {/* Заголовок */}
        <Text style={styles.title}>I am born on</Text>

        {/* Поле выбора даты */}
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text style={styles.dateText}>{birthdate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {/* Модальное окно с DateTimePicker */}
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={closeDatePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {Platform.OS === 'ios' && (
                <TouchableOpacity onPress={closeDatePicker} style={{ alignSelf: 'flex-end' }}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              )}
              <DateTimePicker
                value={birthdate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={onChange}
                maximumDate={new Date()}
              />
              {Platform.OS === 'android' && (
                <Button title="Done" onPress={closeDatePicker} />
              )}
            </View>
          </View>
        </Modal>

        {/* Кнопка продолжения */}
        <TouchableOpacity
          style={[styles.continueButton, { opacity: birthdate ? 1 : 0.5 }]}
          onPress={handleContinue}
          disabled={!birthdate}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 10, // Отступ между кнопкой и прогресс-баром
    padding: 10, // Удобная зона клика
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  datePicker: {
    borderBottomWidth: 2,
    borderColor: '#ffc107',
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  dateText: {
    fontSize: 24,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  doneButton: {
    fontSize: 18,
    color: '#ffc107',
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute', // Кнопка зафиксирована внизу
    bottom: 20, // Расположена на 20 пикселей выше нижнего края экрана
    left: (Dimensions.get('window').width - 200) / 2, // Центрирование кнопки по горизонтали
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#ffc107',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1b263b',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BirthdayScreen;
