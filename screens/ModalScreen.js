import React from 'react';
import { Text, View ,TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHookAuth from '../hooks/useAuth';
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase";


const ModalScreen = () => {
  const { user } = useHookAuth(); // Деструктурируем объект, чтобы получить свойство user
  const[age,setAge] = useState();
  const[image,setImage] = useState();
  

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      age,
      timestamp,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };
  console.log(user);

  return (
    <SafeAreaView>
      
        <Text>Welcome,{user.displayName} </Text> 
        <Text>The profile pic</Text>
        <TextInput placeholder='press picture' className="border"
        keyboardType='url'
        value={image}
        onChange={(text)=>setImage(text)}>
          
        </TextInput>
        <Text>Press yout age</Text>
        <TextInput placeholder='press picture' className="border"
        keyboardType='numeric'
        value={age}
        onChange={(text)=>setAge(text)}>
        </TextInput>
        <TouchableOpacity onPress={updateUserProfile}>
          <View className="border">
            <Text>Update</Text>
          </View>

        </TouchableOpacity>



        
        
      
    </SafeAreaView>
  );
};

export default ModalScreen;
