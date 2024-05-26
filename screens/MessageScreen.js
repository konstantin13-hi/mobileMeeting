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
  //   <SafeAreaView className="flex">
  //     <Header title={name}></Header>
  //     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  // className="flex h-full"
  // keyboardVerticalOffset={10}>

  // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //   <FlatList
  //    data={messages}
  //    className="pl-4"
  //    keyExtractor={(item) => item.id}
  //    inverted={-1}
  //    renderItem={({ item: message }) =>
  //      message.userId === user.uid ? (
  //        <SenderMessage key={message.id} message={message} />
  //      ) : (
  //        <ReceiverMessage key={message.id} message={message} />
  //      )
  //    }
    
  //   />

  // </TouchableWithoutFeedback>

  // <View className="flex flex-row bottom-20">
  //       <TextInput
  //         placeholder="Enter your text"
  //         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
  //         onChangeText={(text) => setInput(text)}
  //         value={input}
  //         onSubmitEditing={sendMessage}
  //       />
  //       <Button title="Submit" color="#FF5864" onPress={sendMessage} />
  //     </View>
    
  // </KeyboardAvoidingView>

      

  //   </SafeAreaView>

  <SafeAreaView  className="pt-5 flex-1">
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </TouchableWithoutFeedback>

        <View
          className=
            "flex-row justify-between items-center bg-white border-t border-gray-200 px-5 py-2"
        
        >
          <TextInput
             className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
  
}

export default MessageScreen;