import React, { Component } from 'react'
import { View, Text } from 'react-native'
import DeckTeaser from './DeckTeaser'
import { TouchableOpacity } from 'react-native-gesture-handler'

class DeckList extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <DeckTeaser />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <DeckTeaser />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <DeckTeaser />
        </TouchableOpacity>
      </View>
    )
  }
}

export default DeckList