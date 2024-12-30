import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/ProfileContext'; // Импортируем useProfile
import { Ionicons } from '@expo/vector-icons';

const ShowMeScreen = ({ route, navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile(); // Используем профиль из контекста

  // Логика определения противоположного пола
  const getOppositeGender = (gender) => (gender === 'MAN' ? 'WOMAN' : 'MAN');

  // Получаем выбранный пол пользователя из профиля
  const userGender = profile.gender;
  const showMeGender = getOppositeGender(userGender); // Определяем противоположный пол

  // Сохраняем предпочтения пользователя
  const handleContinue = () => {
    setProfile({ ...profile, showMe: showMeGender }); // Сохраняем противоположный пол в profile
    navigation.navigate('Photo'); // Переход на следующий экран
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b263b' }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        {/* Прогресс-бар */}
        <ProgressBar step={4} totalSteps={5} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
   
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
            <Ionicons name="chevron-back-outline" size={34} color="#ffc107" />
          </TouchableOpacity>
        
        </View>

        {/* Текст */}
        <Text style={{ fontSize: 24, marginBottom: 20, color: 'white', textAlign: 'center' }}>
          You want to find: {showMeGender === 'MAN' ? 'Man' : 'Woman'}
        </Text>

        {/* Кнопка "Continue" */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            left: (width - 200) / 2, // Центрируем кнопку по горизонтали
          }}
          onPress={handleContinue} // Обработчик кнопки
        >
          <View
            style={{
              height: 50,
              width: 200,
              borderRadius: 10,
              backgroundColor: '#ffc107',
              alignItems: 'center', // Центрируем текст по горизонтали
              justifyContent: 'center', // Центрируем текст по вертикали
            }}
          >
            <Text style={{ color: '#1b263b', fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShowMeScreen;
