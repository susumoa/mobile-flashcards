import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

class NewDeck extends Component {
  state = {
    value: ''
  }

  onChange = (value) => {
    this.setState({value: value})
  }

  submitDeckTitle = () => {

    // AsyncStorage.saveDeckTitle
    //check if existing title

    console.log('submitted')
  }

  render() {
    const { value } = this.state
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={this.onChange}
          placeholder='Deck Title'
        />
        <TouchableOpacity onPress={this.submitDeckTitle}>
          <Text>Submit New Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewDeck