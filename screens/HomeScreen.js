import React, { Component } from 'react'
import { Text, View,Button, TouchableOpacity,Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocationPermission } from '../LocationPermissionContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import{ChatIcon} from '../icons/ChatIcon';
import { useState } from 'react';



import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';


const DUMMY_DATA = [
  {
    displayName: "Ilon Mask",
    job: "Software Engineer",
    photoURL:
"https://www.ixbt.com/img/x780/n1/news/2021/6/5/4adf85be7536d688480f1f6485034c527e552662_large_large_large.jpg",
    age: 33,
    id: 1,
  },
  {
    displayName: "Mark Zuckerberg",
    job: "Programmer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    age: 39,
    id: 2,
  },
  {
    displayName: "Bill G",
    job: "Software Developer",
    photoURL:
      "https://www.mann-ivanov-ferber.ru/assets/media/authors-new/billG.jpg",
    age: 37,
    id: 3,
  },
];

function HomeScreen({ navigation }) {
  const deviceLanguage = getLocales()[0].languageCode;
  const [allCardsShown, setAllCardsShown] = useState(false);

  const renderCard = (card, index) => {
    return (
      <View className="bg-red h-3/4 rounded-xl">
        <Image source={{ uri: card.photoURL }} style={{ flex: 1, width: null, height: null }} />
        <Text>{card.displayName}</Text>
      </View>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <View className="bg-red h-3/4 rounded-xl">
        <Image
          source={{ uri: "https://w0.peakpx.com/wallpaper/341/905/HD-wallpaper-where-the-mask-sad-emoji.jpg" }}
          style={{ flex: 1, width: null, height: null }}
        />
        <Text>No more cards</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center ml-2 mr-2">
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={40} color="gray" onPress={() => navigation.navigate('Account')} />
        </TouchableOpacity>
        <View style={{ height: 60, width: 60 }}>
          <Image source={require('../img/kisspng.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 8 }} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <ChatIcon />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Swiper
          cards={DUMMY_DATA}
          stackSize={3}
          animateCardOpacity
          containerStyle={{ backgroundColor: 'transparent' }}
          renderCard={renderCard}
          onSwipedAll={() => setAllCardsShown(true)}
          cardIndex={0}
          useViewOverflow={Platform.OS === 'ios'}
          animateOverlayLabelsOpacity
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          
          swipeBackCard
        />
        {allCardsShown && renderNoMoreCards()}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen
// style={{backgroundColor:"pink", borderWidth: 1, borderColor: 'black', width: 50, height: 50}}