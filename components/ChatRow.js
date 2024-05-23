
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import useHookAuth from '../hooks/useAuth';
import { useState,useEffect } from 'react';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { useNavigation } from '@react-navigation/native';

const ChatRow = ({matchDetails}) => {
    const navigation = useNavigation();
    const { user } = useHookAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");
  
    useEffect(() => {
      setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);
 
    return (
        <TouchableOpacity
        className=
          "flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg"
        onPress={() => navigation.navigate('Message',{ matchDetails })}
      >
        <Image
          className="rounded-full h-16 w-16 mr-4"
          source={{ uri: matchedUserInfo?.photoURL }}
        />
        <View>
          <Text className="text-lg font-semibold">
            {matchedUserInfo?.displayName}
          </Text>
          <Text>{lastMessage || "Say Hi"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

export default ChatRow
