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

const MessageScreen = () => {
  const { user } = useHookAuth();
  const route = useRoute();
  const { matchDetails } = route.params;
  const name = getMatchedUserInfo(matchDetails.users,user.uid).displayName;
  const [input,setInput] = useState('');


  return (
    <SafeAreaView className="flex">
      <Header title={name}></Header>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  className="flex h-full"
  keyboardVerticalOffset={10}>

  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <FlatList/>

  </TouchableWithoutFeedback>

  <View className="flex flex-row bottom-5">
        <TextInput
          placeholder="Enter your text"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
        />
        <Button title="Submit" color="#FF5864" onPress={() => {}} />
      </View>
    
  </KeyboardAvoidingView>

      

    </SafeAreaView>

  );
  
}

export default MessageScreen;

// onSubmitEditing={sendMessage}


{/* <Text className="text-red-400 semi-bold text-2xl"> dadsadasd</Text>
<Header title={name}>


</Header>
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
className="flex"
keyboardVerticalOffset={10}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <FlatList/>

  </TouchableWithoutFeedback>



<View className ="flex-row justify-between items-center bg-white border-t border-gray-2">
<TextInput className="h-10 text-1g" placeholder="Send Message..." 
onChangeText={setInput}
value={input}/>

<View  className="h-10 w-10 border">

<Button  title="Send" color="#FF5864" />
</View>

</View>

</KeyboardAvoidingView> */}


//




 