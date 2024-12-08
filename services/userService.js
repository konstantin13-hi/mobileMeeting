// services/userService.js
import { db, storage } from '../firebase';
import { doc, setDoc,arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const saveUserProfile = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, userData, { merge: true }); // Объединяет с существующими данными
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const uploadUserPhoto = async (userId, photoUri) => {
  try {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const photoRef = ref(storage, `users/${userId}/photos/${Date.now()}.jpg`);
    await uploadBytes(photoRef, blob);
    const downloadURL = await getDownloadURL(photoRef);

    // Обновляем Firestore с использованием arrayUnion
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { profileImages: arrayUnion(downloadURL) }, { merge: true });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

// Функция для загрузки нескольких фотографий и получения URL
export const uploadMultiplePhotos = async (userId, photos) => {
  try {
    // Загружаем все фото параллельно
    const uploadPromises = photos.map(photo => uploadUserPhoto(userId, photo));
    const uploadedPhotoUrls = await Promise.all(uploadPromises);

    // Обновляем Firestore
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { profileImages: arrayUnion(...uploadedPhotoUrls) }, { merge: true });

    return uploadedPhotoUrls;
  } catch (error) {
    console.error("Error uploading multiple photos:", error);
    throw error;
  }
};