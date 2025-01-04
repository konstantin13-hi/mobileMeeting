import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MatchScreen = ({ navigation }) => {
  const route = useRoute();
  const { loggedInProfile, userSwiped } = route.params;
  const img1 = userSwiped.photos[0]; // Right Image
  const img2 = loggedInProfile.photos[0]; // Left Image
  const name = userSwiped.name || 'User';

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Title Section */}
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.subtitle}>
          Mutual sympathy. Do not waste time and write to her
        </Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          {/* Left Image */}
          <View style={[styles.shadowWrapper, styles.leftImage]}>
            <Image source={{ uri: img2 }} style={styles.image} resizeMode="cover" />
          </View>
          {/* Right Image */}
          <View style={[styles.shadowWrapper, styles.rightImage, styles.imageWithBorder]}>
            <Image source={{ uri: img1 }} style={styles.image} resizeMode="cover" />
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              navigation.goBack();
              navigation.navigate('Chat');
            }}
          >
            <Text style={styles.primaryButtonText}>Write to {name}</Text>
          </TouchableOpacity>
        </View>

        {/* Link Section */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.linkText}>Back to search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b263b', // Dark blue background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginBottom: 30,
  },
  shadowWrapper: {
    width: 140,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#1b263b', // Фон контейнера для тени
    shadowColor: '#ffc107', // Желтая тень
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10, // Для Android
  },
  rightImage: {
    transform: [{ rotate: '25deg' }],
    right: 20,
    borderWidth: 2,
    borderColor: '#ffc107', // Golden yellow border for the right image
  },
  leftImage: {
    transform: [{ rotate: '-25deg' }],
    left: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#ffc107', // Golden yellow color
    borderRadius: 25,
    height: 50,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#1b263b', // Dark blue text
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default MatchScreen;