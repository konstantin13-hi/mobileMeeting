import { StatusBar } from 'expo-status-bar';
import  { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TextInput,Dimensions, Platform ,Modal} from 'react-native';


import * as React from 'react';


import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';


const PhotoScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex:1,padding:20}}>
         <ProgressBar step={5} totalSteps={5} /> 
      </View>
      </SafeAreaView>
    )
  }

export default PhotoScreen;