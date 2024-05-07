import React, { Component } from 'react'
import { Text, View,Button, TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocationPermission } from '../LocationPermissionContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import{ChatIcon} from '../icons/ChatIcon';



import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


function HomeScreen({ navigation }){

  const deviceLanguage = getLocales()[0].languageCode;


    return (
      <SafeAreaView className="flex-1" >
     
      <View  className="flex-row justify-between items-center ml-2 mr-2">
        <TouchableOpacity >
          <MaterialIcons name="account-circle" size={40} color="gray" 
          onPress={()=>navigation.navigate('Account')}/>
        </TouchableOpacity>
        <View style={{ height: 60, width: 60 }}> 
    <Image 
        source={require('../img/kisspng.png')} 
        style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 8 }} 
    /> 
</View>

        <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
          <ChatIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default HomeScreen
