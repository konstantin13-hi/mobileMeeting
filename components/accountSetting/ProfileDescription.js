import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';

const ProfileDescription = () => {
  const [description, setDescription] = useState('');
  const [inputHeight, setInputHeight] = useState(50); // Начальная высота
  const maxHeight = 200; // Максимальная высота

  return (
    <View style={styles.container}>
        <Text>ABOUT ME</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline={true} // Разрешаем несколько строк
        
        style={[styles.input, { height: Math.min(inputHeight, maxHeight) }]}
        onContentSizeChange={(event) => {
          const newHeight = event.nativeEvent.contentSize.height;
          if (newHeight <= maxHeight) {
            setInputHeight(newHeight);
          }
        }}
        maxLength={500} // Максимум 500 символов
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top', // Начало текста сверху
  },
});

export default ProfileDescription;
