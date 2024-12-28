import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ProfileDescription = ({ userId }) => {
  const [description, setDescription] = useState('');
  const [inputHeight, setInputHeight] = useState(100);
  const maxHeight = 200;
  const [debouncedDescription, setDebouncedDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasUserEdited, setHasUserEdited] = useState(false); // Флаг для отслеживания взаимодействия пользователя

  useEffect(() => {
    console.log('Current userId:', userId);
  }, [userId]);

  useEffect(() => {
    // Загружаем описание профиля при монтировании
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('Fetched user data:', userData);
          // Устанавливаем описание только если пользователь не начал редактирование
          if (!hasUserEdited) {
            setDescription(userData.description || '');
          }
        } else {
          console.log('User document does not exist. Creating new document...');
          await setDoc(userDocRef, { description: '' }, { merge: true });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, hasUserEdited]); // Обновление при изменении userId или взаимодействии пользователя

  useEffect(() => {
    // Обновление в Firestore через дебаунс
    if (loading) return;

    const handler = setTimeout(async () => {
      if (!hasUserEdited) return; // Только если пользователь изменял текст

      console.log('Debounced Description:', debouncedDescription);
      try {
        const userDocRef = doc(db, 'users', userId);
        console.log('Updating Firestore document with:', debouncedDescription);
        await updateDoc(userDocRef, { description: debouncedDescription }, { merge: true });
        console.log('Description successfully updated in Firestore.');
      } catch (error) {
        console.error('Error updating description in Firestore:', error);
      }
    }, 500);

    return () => clearTimeout(handler); // Очищаем таймер
  }, [debouncedDescription, hasUserEdited, loading]);

  const handleDescriptionChange = (text) => {
    console.log('Description changed:', text);
    setDescription(text);
    setDebouncedDescription(text);
    setHasUserEdited(true); // Устанавливаем флаг взаимодействия
  };

  return (
    <View style={styles.container}>
      <Text>ABOUT ME</Text>
      <TextInput
        value={description}
        onChangeText={handleDescriptionChange}
        multiline={true}
        style={[styles.input, { height: Math.min(inputHeight, maxHeight) }]}
        onContentSizeChange={(event) => {
          const newHeight = event.nativeEvent.contentSize.height;
          if (newHeight <= maxHeight) {
            setInputHeight(newHeight);
          }
        }}
        maxLength={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    fontSize: 16,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top',
  },
});

export default ProfileDescription;
