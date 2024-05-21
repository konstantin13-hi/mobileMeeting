
import React, { Component } from 'react'

import {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,Dimensions
} from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native'
import FallingHeart from './FallingHeart';
import { Image } from 'react-native'

const MatchScreen =({navigation})=> {
  const route = useRoute();
  const {loggedInProfile,userSwiped} = route.params;
  const img1 = userSwiped.photoURL;
  const img2 = loggedInProfile.photoURL;
  const name = "Name";
  const { width, height } = Dimensions.get('window');
  const hearts = Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      size: Math.random() * 40 + 10,
      duration: Math.random() * 3000 + 2000,
      startX: Math.random() * width,
      endY: height,
    }));
  

  const rotation = new Animated.Value(0);


  return (
    <View className="h-full bg-cyan-800">
      <SafeAreaView>
      {hearts.map(heart => (
          <FallingHeart key={heart.id} size={heart.size} duration={heart.duration} startX={heart.startX} endY={heart.endY} />
        ))}
       
          <Text className="text-white text-center pt-20 text-3xl"> Congratulations </Text>
      <Text className="text-gray-300 font-bold text-center pt-5"> Mutual sympathy. Do not waste time and write to her </Text>


      <View className=" h-2/4 relative">
          <View className="absolute right-10 top-10 rounded-2xl bg-black h-72 w-48 rotate-12 z-10 ">
              <Image source={{uri: img1}} className="object-cover h-full w-full rounded-2xl border-2 border-yellow-600"/>
          </View>
          <View className="absolute left-8 top-20 rounded-2xl bg-black h-60 w-40 -rotate-12 ">
              <Image source={{uri: img2}} className="object-cover h-full w-full rounded-2xl"/>
          </View>
          
      </View>

        
       <View className="flex items-center pt-10">

       <TouchableOpacity
       className="bg-yellow-600 h-10 rounded-full w-2/3 justify-center items-center"
       onPress={() => {
        navigation.goBack();
        navigation.navigate("Chat");
      }} >  
      <Text className="text-black  flex "> Write to {name}</Text>
      </TouchableOpacity>
       </View>

       <View className="flex items-center p-5">

          <TouchableOpacity
          className="justify-center items-center"
          onPress={() => {
           
            navigation.navigate("Home");
          }} >  
      <Text className="text-white  flex "> Back to search</Text>
      </TouchableOpacity>
          </View>


      </SafeAreaView>


      
    
    </View>
  )

 

}

export default MatchScreen
