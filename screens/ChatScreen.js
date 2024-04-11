import React, { Component,useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native'; // Добавляем компонент Picker
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import {Picker} from '@react-native-picker/picker';

const translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは', name: 'んに' }
};

const i18n = new I18n(translations)
i18n.locale = Localization.locale;
i18n.enableFallback = true;
console.log(Localization.getLocales());

function ChatScreen (props){
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
    <Text style={styles.text}>
      {i18n.t('welcome')} {i18n.t('name')}
    </Text>
    <Text>Current locale: {i18n.locale}</Text>
    <Text>Device locale: {Localization.getLocales()[0].languageCode}</Text>
  </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default ChatScreen;
