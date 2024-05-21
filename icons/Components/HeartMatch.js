
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


const HeartMatch =(props)=> {
 
    return (
      <>
      <AntDesign name="heart" size={props.size} color="rgb(202 138 4)" />
      </>
    )
  
}

export default HeartMatch
