// services/userService.js
import { db, storage } from '../firebase';
import { doc, setDoc,arrayUnion,updateDoc,arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL,deleteObject  } from 'firebase/storage';

export const saveUserProfile = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, userData, { merge: true }); // Объединяет с существующими данными
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

// Функция для загрузки одной фотографии
export const uploadUserPhoto = async (userId, photoUri) => {
  try {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    const photoRef = ref(storage, `users/${userId}/photos/${uniqueName}`);
    await uploadBytes(photoRef, blob);
    return await getDownloadURL(photoRef); // Возвращаем только URL
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

// Функция для загрузки нескольких фотографий
export const uploadMultiplePhotos = async (userId, photos) => {
  try {
    const uploadPromises = photos.map(photo => uploadUserPhoto(userId, photo));
    const uploadedPhotoUrls = await Promise.all(uploadPromises);

    // Обновляем Firestore одной операцией
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { photos: arrayUnion(...uploadedPhotoUrls) }, { merge: true });

    return uploadedPhotoUrls; // Возвращаем загруженные URL
  } catch (error) {
    console.error("Error uploading multiple photos:", error);
    throw error;
  }
};



export const deleteUserPhoto = async (userId, photoUrl) => {
  try {
    // Преобразование полного URL в относительный путь
    const baseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    const relativePath = decodeURIComponent(photoUrl.replace(baseStorageUrl, '').split('?')[0]); // Убираем query parameters

    // Удаляем фото из хранилища Firebase
    const photoRef = ref(storage, relativePath);
    await deleteObject(photoRef);

    // Удаляем URL из Firestore
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { photos: arrayRemove(photoUrl) });

    console.log("Photo deleted successfully");
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};


