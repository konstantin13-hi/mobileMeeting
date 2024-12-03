// services/userService.js
import { db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
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
    return downloadURL;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};
