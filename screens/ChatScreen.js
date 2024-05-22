import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ChatList from '../components/ChatLIst'

const ChatScreen =({navigation})=> {

    return (
   

   <SafeAreaView>


 
    
        <Header title={"Chat"}/>
        <ChatList />
      
      </SafeAreaView>

    
    )
  
}

export default ChatScreen
