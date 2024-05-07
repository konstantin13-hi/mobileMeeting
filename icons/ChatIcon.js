

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export class ChatIcon extends Component {
  render() {
    return (
      <View>
      <Ionicons name="chatbubbles-sharp" size={30} color="black" />
      </View>
    )
  }
}

export default ChatIcon
