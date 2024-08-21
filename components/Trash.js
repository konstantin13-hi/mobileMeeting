import FontAwesome from '@expo/vector-icons/FontAwesome';

import React from 'react'
import { View, Text } from "react-native";

const Trash = () => {
    return(
        <View style={{
            position: 'absolute', 
            right: 5,         // Размещает элемент вплотную к правой границе контейнера
            bottom: 5,        // Размещает элемент вплотную к нижней границе контейнера
            zIndex: 10 ,       // Устанавливает элемент выше других с меньшим zIndex
            backgroundColor:'red',
            borderRadius:20,
            width:40,
            height:40
          }}>
            <FontAwesome name="trash-o" size={35} color="black" />
        </View>
    )

}

export default Trash;