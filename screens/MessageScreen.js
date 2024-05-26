import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp } from "../firebase";
import useHookAuth from "../hooks/useAuth";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";

const MessageScreen = () => {
  const { user } = useHookAuth();
  const route = useRoute();
  const { matchDetails } = route.params;
  const name = getMatchedUserInfo(matchDetails.users,user.uid).displayName;
  const [input,setInput] = useState('');
  // console.log(matchDetails.id);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapShot) =>
        setMessages(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, [matchDetails]);


  const sendMessage = () => {
  
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp,
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };



    return (
      
      <SafeAreaView className="pt-5 flex-1 bg-main">
        <View className="flex-row justify-between mr-5">
          <Header
            title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
          />
          <View className="h-10 w-10 bg-black rounded-full">
            <Image
              source={{ uri: getMatchedUserInfo(matchDetails.users, user.uid).photoURL }}
              className="h-full w-full object-cover rounded-full"
            />
          </View>
        </View>
        <View className="border-b-2 border-white"></View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
              <FlatList
                data={messages}
                className="pl-4"
                keyExtractor={(item) => item.id}
                inverted={-1}
                renderItem={({ item: message }) =>
                  message.userId === user.uid ? (
                    <SenderMessage key={message.id} message={message} />
                  ) : (
                    <ReceiverMessage key={message.id} message={message} />
                  )
                }
              />
              <View className="flex-row items-center border-t border-gray-200 p-4">
                <TextInput
                  style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10 }}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Введите сообщение..."
                />
                <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
                  <Text style={{ color: 'blue', fontWeight: 'bold' }}>Отправить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  
}

export default MessageScreen;