import React, { Component } from 'react'
import { Text, View,Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';

import { useLocationPermission } from '../LocationPermissionContext';

function HomeScreen({ navigation }){

  const deviceLanguage = getLocales()[0].languageCode;
  console.log(deviceLanguage);



    return (
      <View>
        <Text> Home </Text>



        <Button
        title="Go to Chat sdasds"
        onPress={() => navigation.navigate('Chat')}
      />
      </View>
    )
}

export default HomeScreen
