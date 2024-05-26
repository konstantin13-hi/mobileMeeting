import { View, Text } from "react-native";
import React from "react";


const SenderMessage = ({ message }) => {
  return (
    <View
     className=
        "bg-mainGolden rounded-l-2xl  px-5 py-3 mx-3 my-2 ml-auto"
    >
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;