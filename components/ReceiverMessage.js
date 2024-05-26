import { View, Text, Image } from "react-native";
import React from "react";


const ReceiverMessage = ({ message }) => {
  return (
    <View
       className=
        "bg-messRec rounded-lg rounded-tl-none px-5 py-3 mr-3 my-2 flex-start" 
    >
     
      <Text className="text-white mt-1">{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;