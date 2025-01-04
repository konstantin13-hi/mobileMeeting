import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ChatList from '../components/ChatLIst'

const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b263b' }}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;