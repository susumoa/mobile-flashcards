import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Deck from './Deck'

class DeckList extends Component {
  render() {
    return (
      <View>
        <Deck />
        <Deck />
        <Deck />
      </View>
    )
  }
}

export default DeckList