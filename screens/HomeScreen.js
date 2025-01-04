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
import generateId from '../lib/generateid';
import Animated from 'react-native-reanimated';

import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import HeartIcon from '../icons/HeartIcon';
import CancelIcon from '../icons/CancelIcon';
import BackIcon from '../icons/BackIcon';
import useHookAuth from '../hooks/useAuth';





function HomeScreen({ navigation }) {
  const deviceLanguage = getLocales()[0].languageCode;
  const [allCardsShown, setAllCardsShown] = useState(false);
  const {user} = useHookAuth();
  const [profiles,setProfiles] = useState([]);

  const swipeRef = useRef(null);
  



  const renderNoMoreCards = () => {
    return (
      <ActivityIndicator size="large" color="red" />
    );
  };

  // useEffect(() => {
  //   let unsub;

  //   const fetchCards = async () => {

  //     const passes = await getDocs(
  //       collection(db, "users", user.uid, "passes")
  //     ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

  //     // console.log(passes);

  //     const swipes = await getDocs(
  //       collection(db, "users", user.uid, "swipes")
  //     ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

  //     const passedUserIds = passes.length > 0 ? passes : ["temp"];
  //     const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];

  //     unsub = onSnapshot(
  //       query(
  //         collection(db, "users"),
  //         where("id", "not-in", [...passedUserIds, ...swipedUserIds])
  //       ),
  //       (snapShot) => {
  //         setProfiles(
  //           snapShot.docs
  //             .filter((doc) => doc.id !== user.uid)
  //             .map((doc) => ({
  //               id: doc.id,
  //               ...doc.data(),
  //             }))
  //         );
  //       }
  //     );

  //   };

  //   fetchCards();

  //   return unsub;
  // }, []);
  useEffect(() => {
    let unsub;
  
    const fetchCards = async () => {
      try {
        // Fetch swiped and passed users
        const passes = await getDocs(
          collection(db, "users", user.uid, "passes")
        ).then((snapShot) => snapShot.docs.map((doc) => doc.id));
  
        const swipes = await getDocs(
          collection(db, "users", user.uid, "swipes")
        ).then((snapShot) => snapShot.docs.map((doc) => doc.id));
  
        // Combine passed and swiped users
        const excludedIds = [...passes, ...swipes, user.uid]; // Exclude the current user as well
  
        unsub = onSnapshot(collection(db, "users"), (snapshot) => {
          const fetchedProfiles = snapshot.docs
            .filter((doc) => !excludedIds.includes(doc.id)) // Exclude users by their ID
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
  
          setProfiles(fetchedProfiles);
          console.log("Filtered Profiles: ", fetchedProfiles);
        });
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
  
    fetchCards();
  
    return unsub;
  }, []);
  console.log(profiles)

  const [viewedCards, setViewedCards] = useState([]); // Список просмотренных карточек

    const swipeLeft = (cardIndex) => {
      if (!profiles[cardIndex]) {
        return;
      }

      const userSwiped = profiles[cardIndex];
      setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };

  // const renderCard = (card, index) => {
  //   return (
  //     <View className="h-2/3 border bg-white rounded-xl mt-10">
  //       <View className="bg-black h-4/5 rounded-t-xl">
  //       <Image source={{ uri: card?.photoURL }}  className="object-cover h-full w-full rounded-t-xl" />
  //       </View>
     
  //       <Text>{card?.displayName}</Text>
  //     </View>
  //   );
  // };

  const renderCard = (card, index) => {
    const firstPhoto = card.photos && card.photos.length > 0 ? card.photos[0] : null;
  
    return (
      <View key={index} className="h-2/3 border bg-white rounded-xl -mt-10">
        <View className="bg-black h-4/5 rounded-t-xl relative">
          {firstPhoto ? (
            <Animated.Image
              source={{ uri: firstPhoto }}
              className="object-cover h-full w-full rounded-t-xl"
              sharedTransitionTag="tag"
            />
          ) : (
            <View className="bg-gray-300 h-full w-full rounded-t-xl flex items-center justify-center">
              <Text className="text-gray-500">No Photo Available</Text>
            </View>
          )}
          <Button
            title="Go to UserProfile"
            onPress={() => navigation.navigate('UserProfile', { card })}
          />
        </View>
        <Text>{card?.displayName || "No Name"}</Text>
      </View>
    );
  };
  const renderButtons = () => {
    const handleSwipeLeft = () => {
      if (profiles.length > 0) {
        swipeLeft(0); // Always swipe the first card in the array
        swipeRef.current.swipeLeft(); // Trigger the swiper's left swipe animation
      }
    };
  
    const handleSwipeRight = () => {
      if (profiles.length > 0) {
        swipeRight(0); // Always swipe the first card in the array
        swipeRef.current.swipeRight(); // Trigger the swiper's right swipe animation
      }
    };
  
    return (
      <View className="flex-row justify-between ml-20 mr-20">
        <TouchableOpacity className="relative" onPress={handleSwipeLeft}>
          <View className="absolute bg-white h-12 w-10 rounded-full inset-0 top-2 left-2"></View>
          <CancelIcon size={66} color={"grey"} className="overflow-hidden" />
        </TouchableOpacity>
        <TouchableOpacity className="relative" onPress={handleSwipeRight}>
          <View className="absolute bg-white h-12 w-10 rounded-full inset-0 top-2 left-2"></View>
          <HeartIcon size={64} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const swipeRight = async (cardIndex) => {
    try {
      if (!profiles[cardIndex]) {
        return;
      }

      const userSwiped = profiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      console.log("loggedInProfile", loggedInProfile);

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (docSnap) => {
          if (docSnap.exists()) {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp,
            });

            console.log(loggedInProfile, userSwiped);

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <SafeAreaView className="relative h-screen w-screen bg-main">
       
      
      <View className=" flex-row justify-between items-center ml-20 mr-20">
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={40} color="white" onPress={() => navigation.navigate('Account')} />
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
    <View>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
   
   <View>
  
    <View className="h-4/5   ">
      <Swiper
        cards={profiles}
        stackSize={2}
        animateCardOpacity
        backgroundColor={null}
        ref={swipeRef}
        marginTop={null}
        marginBottom={null}
        onSwipedLeft={(cardIndex) => {
          console.log("Swipe left");
          swipeLeft(cardIndex);
        }}
        onSwipedRight={(cardIndex) => {
          console.log("Swipe Right");
          swipeRight(cardIndex);
        }}
        renderCard={renderCard}
        onSwipedAll={() => setAllCardsShown(true)}
        cardIndex={0}
        useViewOverflow={Platform.OS === 'ios'}
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            element: 
            <View className="relative">   
             <View className="absolute bg-white h-12 w-14 rounded-full inset-0 top-3 left-3">
            </View>
            <CancelIcon size={80} color={"grey"}>  
             </CancelIcon>
             </View>
            
            
       , /* Optional */
              style: {
                wrapper: {
                  height:483,
                  backgroundColor: "rgba(167, 167, 167, 0.5)",
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius:12,
                  marginTop:-40,
                  borderWidth:5,
                  borderColor:'rgb(167, 167, 167)',
                  
                  
                  
                }
              }
          },
          right: {
            element: 
            <View className="relative">   
             <View className="absolute bg-white h-12 w-12 rounded-full inset-0 top-3 left-3">
            </View>
            <HeartIcon size={80}></HeartIcon>
            </View>, /* Optional */
        
              style: {
              
                wrapper: {
                  height:483,
                  backgroundColor: "rgba(181, 154, 101, 0.5)",
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius:12,
                  marginTop:-40,
                  borderWidth:5,
                  borderColor:'rgb(181, 154, 101)',
                  
                  
                  
                }
              }
            },
            top: {
              element: 
              <View className="relative">   
               <View className="absolute bg-white h-12 w-12 rounded-full inset-0 top-3 left-3">
              </View>
              <HeartIcon size={80}></HeartIcon>
              </View>, /* Optional */
          
                style: {
                
                  wrapper: {
                    height:483,
                    backgroundColor: "rgba(181, 154, 101, 0.5)",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius:12,
                    marginTop:-40,
                    borderWidth:5,
                    borderColor:'rgb(181, 154, 101)',
                    
                    
                    
                  }
                }

            },
            bottom: {
              element: 
              <View className="relative">   
               <View className="absolute bg-white h-12 w-12 rounded-full inset-0 top-3 left-3">
              </View>
              <HeartIcon size={80}></HeartIcon>
              </View>, /* Optional */

                style: {
                  wrapper: {
                    height:483,
                    backgroundColor: "rgba(181, 154, 101, 0.5)",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius:12,
                    marginTop:-40,
                    borderWidth:5,
                    borderColor:'rgb(181, 154, 101)',
                  }
                }
            }
        }}
        swipeBackCard 
     />
    </View>

     <View>
       {renderButtons()}
      </View>
    </View> 
  )}
    </SafeAreaView>
   
  );
}
export default HomeScreen