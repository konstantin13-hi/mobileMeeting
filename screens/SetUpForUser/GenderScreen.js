import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useProfile } from '../../hooks/ProfileContext';// Импортируем useProfile

const GenderScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile(); // Используем профиль из контекста
  const [selectedGender, setSelectedGender] = useState(profile.gender || null); // Начальное значение из профиля

  // Функция для обработки выбора пола
  const selectGender = (gender) => {
    setSelectedGender(gender);
    setProfile({ ...profile, gender }); // Обновляем профиль
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
            left: (width - 200) / 2, // Центрируем кнопку по горизонтали
            opacity: isContinueEnabled ? 1 : 0.5, // Изменяем прозрачность в зависимости от состояния
          }}
          onPress={() => {
            if (isContinueEnabled) {
              navigation.navigate('ShowMe', { selectedGender }); // Передача выбранного пола
            }
          }}
          disabled={!isContinueEnabled} // Отключаем кнопку, если пол не выбран
        >
          <View
            style={{
              height: 50,
              width: 200,
              borderRadius: 10,
              backgroundColor: 'red',
              padding: 10,
              marginBottom: 10,
              alignItems: 'center', // Центрируем текст по горизонтали
              justifyContent: 'center', // Центрируем текст по вертикали
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;
