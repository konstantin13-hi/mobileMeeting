import React, { Component ,useLayoutEffect } from 'react'
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
import { useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, timestamp } from "../firebase";
import { useEffect } from 'react';


import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import HeartIcon from '../icons/HeartIcon';
import CancelIcon from '../icons/CancelIcon';
import BackIcon from '../icons/BackIcon';
import useHookAuth from '../hooks/useAuth';


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
  const {user} = useHookAuth();
  const [profiles,setProfiles] = useState([]);

  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((snapShot) => {
      if (!snapShot.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);

  const renderNoMoreCards = () => {
    return (
      <View className="h-3/4 rounded-xl">
        <Image
          source={{ uri: "https://w0.peakpx.com/wallpaper/341/905/HD-wallpaper-where-the-mask-sad-emoji.jpg" }}
          style={{ flex: 1, width: null, height: null }}
        />
        <Text>No more cards</Text>
      </View>
    );
  };

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {

      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      console.log(passes);

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["temp"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapShot) => {
          setProfiles(
            snapShot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );

    };

    fetchCards();

    return unsub;
  }, []);

  const [viewedCards, setViewedCards] = useState([]); // Список просмотренных карточек
 

  // const onSwipedLeft = () => {
  //   const newIndex = currentIndex + 1;
  //   setViewedCards([...viewedCards, currentIndex]); // Добавляем текущую карточку в список просмотренных
  //   setCurrentIndex(newIndex);
  // };

  // const onSwipedRight = () => {
  //   const newIndex = currentIndex + 1;
  //   setViewedCards([...viewedCards, currentIndex]);
  //   setCurrentIndex(newIndex);
  // };

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'users'));
  //       const usersData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProfiles(usersData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);


  const renderCard = (card, index) => {
    return (
      <View className="h-3/4 rounded-xl">
        <Image source={{ uri: card.photoURL }}  style={{ flex: 1, width: null, height: null }}/>
        <Text>{card.displayName}</Text>
      </View>
    );
  };
  // const swipeBack =()=> {
  //   swipeRef.current.swipeBack();
  // }
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  }

  return (
    <SafeAreaView className="relative h-screen w-screen">
      
      <View className=" flex-row justify-between items-center ml-2 mr-2">
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={40} color="gray" onPress={() => navigation.navigate('Account')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Modal')}> 

        <View style={{ height: 60, width: 60 }}>
          <Image source={require('../img/kisspng.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 8 }} />
        </View>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <ChatIcon />
        </TouchableOpacity>
      </View>

      {profiles.length === 0 ? (
      <ActivityIndicator size="large" color="red" />
    ) : (
      <View>
      <Swiper
   
        cards={profiles}
        stackSize={2}
        animateCardOpacity
        ref={swipeRef}
        onSwipedLeft={(cardIndex) => {
          console.log("Swipe left");
          swipeLeft(cardIndex);
        }}
        onSwipedRight={(cardIndex) => {
          console.log("Swipe Right");
          swipeRight(cardIndex);
        }}
    
        // containerStyle={{ backgroundColor: 'transparent' }}
        renderCard={renderCard}
        onSwipedAll={() => setAllCardsShown(true)}
        cardIndex={0} // Используем индекс текущей карточки
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
        
      > 
       <TouchableOpacity >
       </TouchableOpacity>
   
       </Swiper>
      {allCardsShown && renderNoMoreCards()}
     
    </View>
    )}

     
      <View className="absolute bottom-10  w-screen flex-row justify-between p-5">
        <TouchableOpacity  >
            <BackIcon size={34}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()}>
            <CancelIcon size={34} />
          </TouchableOpacity>
          <TouchableOpacity >
            <HeartIcon size={34}/>
          </TouchableOpacity>
       </View>

    </SafeAreaView>
    // <View>
    //   {profiles.map((user) => (
    //     console.log(user)
    //   ))}
    // </View>
  );
}

export default HomeScreen
// style={{backgroundColor:"pink", borderWidth: 1, borderColor: 'black', width: 50, height: 50}}