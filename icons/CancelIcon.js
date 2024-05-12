import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export class CancelIcon extends Component {
  render() {
    return (
        <MaterialIcons name="cancel" size={this.props.size} color="black" />
    )
  }
}

export default CancelIcon
