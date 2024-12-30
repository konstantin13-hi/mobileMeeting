import { useState } from 'react';
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
  ScrollView,
} from 'react-native';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b263b' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          {/* Прогресс-бар */}
          <ProgressBar step={1} totalSteps={5} />

          {/* Заголовок */}
          <Text style={styles.title}>My first name is</Text>

          {/* Поле ввода */}
          <TextInput
            style={[styles.input, { width: width * 0.8 }]}
            value={firstName}
            placeholder="Enter your first name"
            placeholderTextColor="#8a9ba8"
            onChangeText={setFirstName} // Обновляем состояние при изменении текста
          />

          {/* Кнопка продолжения */}
          <TouchableOpacity
            style={[styles.continueButton, { opacity: firstName ? 1 : 0.5 }]}
            onPress={handleContinue}
            disabled={!firstName} // Отключаем кнопку, если поле пустое
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#ffc107',
    color: '#fff',
    alignSelf: 'center',
    paddingVertical: 5,
    marginBottom: 40,
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

export default FirstNameScreen;
