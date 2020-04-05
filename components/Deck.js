import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render() {
    return (
      <View>
        <Text>Deck</Text>
        <Text>{3} cards</Text>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Deck