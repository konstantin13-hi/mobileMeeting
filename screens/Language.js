import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next, { languageResources } from '../i18n';
import languagesList from '../languagesList.json';
import {Picker} from '@react-native-picker/picker';

const Language = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Выбранный язык
  const { t } = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
    
      </Modal>

      <Text style={styles.text}>{t('welcome')}</Text>
      {/* Пикер для выбора языка */}
      <Picker
        selectedValue={selectedLanguage}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedLanguage(itemValue);
          changeLng(itemValue); // Вызываем функцию изменения языка при выборе значения в Пикере
        }}>
        {/* Опции выбора языка */}
        {Object.keys(languageResources).map((lng) => (
          <Picker.Item key={lng} label={languagesList[lng].nativeName} value={lng} />
        ))}
      </Picker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // button: {
  //   backgroundColor: '#6258e8',
  //   padding: 10,
  //   borderRadius: 3,
  //   marginTop: 10,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
  // text: {
  //   marginBottom: 10,
  //   fontSize: 18,
  // },
  // languagesList: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   padding: 10,
  //   backgroundColor: '#6258e8',
  // },
  // languageButton: {
  //   padding: 10,
  //   borderBottomColor: '#dddddd',
  //   borderBottomWidth: 1,
  // },
  // lngName: {
  //   fontSize: 16,
  //   color: 'white',
  // },
});

export default Language;
