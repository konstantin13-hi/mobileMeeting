import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ProgressBar from '../../components/ProgressBar';
import { uploadMultiplePhotos, saveUserProfile } from '../../services/userService';
import useHookAuth from '../../hooks/useAuth';
import { useProfile } from '../../hooks/ProfileContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

const PhotoScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const [photos, setPhotos] = useState([]);
  const { user, isProfileComplete, setIsProfileComplete } = useHookAuth();
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useProfile();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Permission to access your photo library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const maxWidth = 2000;
      const maxHeight = 2000;
      const compressedPhotos = [];

      for (const asset of result.assets) {
        try {
          if (asset.width > maxWidth || asset.height > maxHeight) {
            const manipResult = await ImageManipulator.manipulateAsync(
              asset.uri,
              [{ resize: { width: maxWidth, height: maxHeight } }],
              { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            compressedPhotos.push(manipResult.uri);
          } else {
            compressedPhotos.push(asset.uri);
          }
        } catch (error) {
          console.error("Error processing photo:", error);
          Alert.alert("Error", "An error occurred while processing your photos.");
        }
      }

      setPhotos((prev) => [...prev, ...compressedPhotos].slice(0, 6));
    }
  };

  const handleNext = async () => {
    if (photos.length < 3) {
      Alert.alert("Insufficient Photos", "Please upload at least 3 photos.");
      return;
    }

    setLoading(true);

    try {
      const uploadedPhotoUrls = await uploadMultiplePhotos(user.uid, photos);

      const updatedProfile = {
        ...profile,
        photos: uploadedPhotoUrls,
      };

      await saveUserProfile(user.uid, updatedProfile);
      setPhotos(uploadedPhotoUrls);
      setProfile(updatedProfile);
      setIsProfileComplete(true);
      Alert.alert("Profile Updated", "Your profile has been successfully updated!");
    } catch (error) {
      console.error("Error saving user profile:", error);
      Alert.alert("Error", "An error occurred while saving your profile.");
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressBar step={5} totalSteps={5} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={34} color="#ffc107" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload at least 3 photos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ffc107" style={styles.loader} />
        ) : (
          <>
            <View style={styles.photosContainer}>
              {photos.map((uri, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image source={{ uri }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              {photos.length < 6 && (
                <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                  <Ionicons name="add" size={40} color="#1b263b" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[styles.continueButton, photos.length < 3 && styles.disabledContinueButton]}
              onPress={handleNext}
              disabled={photos.length < 3 || loading}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b263b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  photoWrapper: {
    position: 'relative',
    margin: 10,
    borderRadius: 10,
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
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff5864',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#ffc107', // Тень для кнопки добавления
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  loader: {
    marginVertical: 20,
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
  disabledContinueButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#1b263b',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PhotoScreen;