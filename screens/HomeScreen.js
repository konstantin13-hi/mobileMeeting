import React, { Component } from 'react'
import { Text, View,Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }){

    return (
      <View>
        <Text> Home </Text>
        <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat')}
      />
      </View>
    )
}

export default HomeScreen
