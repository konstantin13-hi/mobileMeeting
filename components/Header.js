import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Phone from "../icons/Phone";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (

    <View className="flex flex-row">
    
     <TouchableOpacity
          className="p-2"
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <View>
        <Text className="text-2xl font-bold">{title}</Text>
      </View>


      {callEnabled && (
        <TouchableOpacity className="rounded-full mr-4 p-3 bg-red-200">
         <Phone/>
        </TouchableOpacity>
      )}
      
    </View>
    
  );
};

export default Header;
