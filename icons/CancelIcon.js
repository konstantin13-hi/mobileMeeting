import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import tw from 'twrnc';
const CancelIcon  =({size,color}) => {


    return (

     <MaterialIcons name="cancel" size={size} color={color} /> 
 
               
                  

      
     
    )
  
}


const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",

    
  },
});

export default CancelIcon;
