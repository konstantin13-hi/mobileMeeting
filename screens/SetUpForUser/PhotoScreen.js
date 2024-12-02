import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ProgressBar from '../../components/ProgressBar';
import { uploadUserPhoto, saveUserProfile } from '../../services/userService';
import useHookAuth from '../../hooks/useAuth';
import { useProfile } from '../../hooks/ProfileContext';
import { ActivityIndicator } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db,storage} from '../../firebase';
import {ref ,uploadBytes, getDownloadURL} from'firebase/storage'

const PhotoScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const { user } = useHookAuth();
  console.log(user);
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
      const newPhotos = result.assets.map((asset) => asset.uri);
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleNext = async () => {
    if (photos.length < 1) {
      Alert.alert("Insufficient Photos", "Please upload at least 1 photo.");
      return;
    }
  
    setLoading(true); // Включаем индикатор загрузки
    
    try {
      // Загружаем фото в Firebase Storage и получаем их URL
      const uploadedPhotoUrls = [];
      for (const photo of photos) {
        const response = await fetch(photo); // Получаем blob для каждого фото
        const blob = await response.blob();
        const photoRef = ref(storage, `users/${user.uid}/photos/${Date.now()}.jpg`);
        await uploadBytes(photoRef, blob);
        const downloadURL = await getDownloadURL(photoRef); // Получаем публичный URL загруженного фото
        uploadedPhotoUrls.push(downloadURL); // Сохраняем URL в массив
      }
  
      // Создаём новый объект профиля с URL фотографий
      const updatedProfile = {
        ...profile, // Копируем все существующие данные профиля
        photos: uploadedPhotoUrls, // Добавляем массив с URL фотографий
      };
  
      // Сохраняем данные в Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, updatedProfile);
      console.log("User profile updated successfully!");
      Alert.alert("Profile Updated", "Your profile has been successfully updated!");
      navigation.navigate('Home')
    } catch (error) {
      console.error("Error saving user profile:", error);
      Alert.alert("Error", "An error occurred while saving your profile.");
    } finally {
      setLoading(false); // Выключаем индикатор загрузки
    }
  };

  const removePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={5} totalSteps={5} />
      <Text style={styles.headerText}>Upload at least 3 photos</Text>
  
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />
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
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {photos.length < 6 && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
            )}
          </View>
  
          <TouchableOpacity
            style={[styles.nextButton, photos.length < 3 && { backgroundColor: '#ccc' }]}
            onPress={handleNext}
            disabled={photos.length < 3 || loading}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  addPhotoText: {
    fontSize: 30,
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PhotoScreen;
