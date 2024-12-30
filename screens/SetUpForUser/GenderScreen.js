import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useProfile } from '../../hooks/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

const GenderScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile();
  const [selectedGender, setSelectedGender] = useState(profile.gender || null);

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setProfile({ ...profile, gender });
  };

  const isContinueEnabled = selectedGender !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        {/* Прогресс-бар и кнопка "Назад" */}
        <ProgressBar step={3} totalSteps={5} />
     
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={34} color="#ffc107" />
          </TouchableOpacity>
         

        {/* Заголовок */}
        <Text style={styles.title}>I am ...</Text>

        {/* Кнопка "MAN" */}
        <TouchableOpacity
          onPress={() => selectGender('MAN')}
          disabled={selectedGender === 'MAN'}
          style={[
            styles.genderButton,
            selectedGender === 'MAN' && styles.selectedButton,
          ]}
        >
          <Text style={styles.genderText}>MAN</Text>
        </TouchableOpacity>

        {/* Кнопка "WOMAN" */}
        <TouchableOpacity
          onPress={() => selectGender('WOMAN')}
          disabled={selectedGender === 'WOMAN'}
          style={[
            styles.genderButton,
            selectedGender === 'WOMAN' && styles.selectedButton,
          ]}
        >
          <Text style={styles.genderText}>WOMAN</Text>
        </TouchableOpacity>

        {/* Кнопка "Continue" */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: isContinueEnabled ? 1 : 0.5 },
          ]}
          onPress={() => {
            if (isContinueEnabled) {
              navigation.navigate('ShowMe', { selectedGender });
            }
          }}
          disabled={!isContinueEnabled}
        >
          <View style={styles.continueButtonInner}>
            <Text style={styles.continueText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b263b',
  },
  content: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  genderButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#343a40',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Для Android тени
  },
  selectedButton: {
    backgroundColor: '#ffc107',
  },
  genderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    left: (Dimensions.get('window').width - 200) / 2, // Центрируем по горизонтали
  },
  continueButtonInner: {
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#ffc107',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#1b263b',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
