import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/ProfileContext'; // Импортируем useProfile
import {Ionicons } from "@expo/vector-icons";

const ShowMeScreen = ({ route, navigation }) => {
  const { width } = Dimensions.get('window');
  const { selectedGender } = route.params;
  const { profile, setProfile } = useProfile(); // Используем профиль из контекста


  // Сохраняем предпочтения пользователя
  const handleContinue = () => {
    setProfile({ ...profile, showMe: selectedGender === 'MAN' ? 'Man' : 'Woman' });
    navigation.navigate('Photo'); // Переход на следующий экран
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <ProgressBar step={4} totalSteps={5} />

       <TouchableOpacity
          className="p-2"
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          You want to find: {selectedGender === 'MAN' ? 'Man' : 'Woman'}
        </Text>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            left: (width - 200) / 2, // Центрируем кнопку по горизонтали
          }}
          onPress={handleContinue} // Обработчик кнопки
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

export default ShowMeScreen;
