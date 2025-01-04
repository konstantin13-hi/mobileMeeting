import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/ProfileContext';

const FirstNameScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const { profile, setProfile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [loading, setLoading] = useState(true); // Start with loading state

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to proceed. Please enable it in your device settings.'
          );
          setLoading(false);
          return;
        }

        // Get user location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setProfile((prevProfile) => ({
          ...prevProfile,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }));
      } catch (error) {
        Alert.alert(
          'Error',
          'An error occurred while retrieving your location. Please try again.'
        );
        console.error(error);
      } finally {
        setLoading(false); // Stop loading once permission is handled
      }
    };

    requestLocationPermission();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleContinue = () => {
    setProfile({ ...profile, firstName });
    navigation.navigate('Birthday');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b263b' }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffc107" />
          <Text style={styles.loadingText}>Requesting location...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
            {/* Progress Bar */}
            <ProgressBar step={1} totalSteps={5} />

            {/* Title */}
            <Text style={styles.title}>My first name is</Text>

            {/* Input */}
            <TextInput
              style={[styles.input, { width: width * 0.8 }]}
              value={firstName}
              placeholder="Enter your first name"
              placeholderTextColor="#8a9ba8"
              onChangeText={setFirstName}
            />

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, { opacity: firstName ? 1 : 0.5 }]}
              onPress={handleContinue}
              disabled={!firstName}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b263b',
  },
  loadingText: {
    color: '#ffc107',
    marginTop: 10,
    fontSize: 16,
  },
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

export default FirstNameScreen;