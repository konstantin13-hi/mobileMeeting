// imagePicker.js
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Импорт из Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Импорт из Firebase Firestore

export const pickImage = async (db, storage, userId, setImageUrls) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert('Permission Denied', 'Permission to access gallery is required!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    const uri = result.assets[0].uri;
    const response = await fetch(uri);

    const blob = await response.blob();
    const filename = uri.split('/').pop();

    const storageRef = ref(storage, `images/${filename}`);

    
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
  

    // Обновляем локальный массив изображений
    setImageUrls((prevImageUrls) => [...prevImageUrls, downloadURL]);

    // Обновляем массив profileImages в базе данных для текущего пользователя
    const userDoc = doc(db, 'users', userId); // Используем userId для идентификации пользователя
    
    await updateDoc(userDoc, {
      profileImages: arrayUnion(downloadURL)
    });

    console.log('Image URL added successfully');
    return downloadURL;  // Возвращаем URL загруженного изображения
  }

  return null;
};