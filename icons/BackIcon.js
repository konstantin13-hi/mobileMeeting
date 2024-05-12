import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';

export class BackIcon extends Component {
  render() {
    return (
        <FontAwesome6 name="circle-arrow-left" size={this.props.size} color="black" />
    )
  }
}

export default BackIcon
