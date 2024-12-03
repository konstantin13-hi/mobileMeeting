// components/PhotoUploader.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadUserPhoto } from '../services/userService';

const PhotoUploader = ({ userId, onPhotosUpdated }) => {
  const [photos, setPhotos] = useState([]);

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

  const uploadPhotos = async () => {
    try {
      const photoUrls = [];
      for (const photoUri of photos) {
        const downloadURL = await uploadUserPhoto(userId, photoUri);
        photoUrls.push(downloadURL);
      }
      onPhotosUpdated(photoUrls); // Передаем список URL в родительский компонент
    } catch (error) {
      Alert.alert("Error", "An error occurred while uploading photos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.photosContainer}>
        {photos.map((uri, index) => (
          <View key={index} style={styles.photoWrapper}>
            <Image source={{ uri }} style={styles.photo} />
          </View>
        ))}
        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Text style={styles.addPhotoText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={uploadPhotos}>
        <Text style={styles.uploadButtonText}>Upload Photos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoWrapper: {
    margin: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PhotoUploader;
