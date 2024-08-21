import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from "@react-navigation/native";
import { Button, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const UserProfile =({navigation})=>{
    const route = useRoute();
    const {card} = route.params;

    return(
        
 
    <View className="2/3">
    <Animated.Image
      source={{ uri: card.photoURL }}
      style={{ width: null, height: 500 }}
      sharedTransitionTag="tag"
    />
        <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
 )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },})

export default UserProfile
