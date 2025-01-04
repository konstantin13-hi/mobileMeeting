import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
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

  const today = new Date();
  const minimumDate = new Date(
    today.getFullYear() - 100, // Allow up to 100 years old
    today.getMonth(),
    today.getDate()
  );
  const maximumDate = new Date(
    today.getFullYear() - 18, // Minimum age 18 years
    today.getMonth(),
    today.getDate()
  );

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
        {/* Progress Bar */}
        <ProgressBar step={2} totalSteps={5} />

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={34} color="#ffc107" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>I am born on</Text>

        {/* Date Picker Field */}
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text style={styles.dateText}>{birthdate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {/* Modal for Date Picker */}
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
                maximumDate={maximumDate} // Minimum age 18 years
                minimumDate={minimumDate} // Allow up to 100 years old
              />
              {Platform.OS === 'android' && (
                <Button title="Done" onPress={closeDatePicker} />
              )}
            </View>
          </View>
        </Modal>

        {/* Continue Button */}
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
    marginRight: 10,
    padding: 10,
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
    position: 'absolute',
    bottom: 20,
    left: (Dimensions.get('window').width - 200) / 2,
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