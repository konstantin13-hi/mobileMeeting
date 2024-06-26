import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export class HeartIcon extends Component {
  render() {
    return (
   
        <MaterialCommunityIcons name="heart-circle" size={this.props.size} color='rgb(181, 154, 101)' />
   
    )
  }
}

export default HeartIcon
