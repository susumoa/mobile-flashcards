import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { saveDeckTitle, getDecks } from '../utils/api'
import { formatDeck } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    value: ''
  }

  onChange = (value) => {
    this.setState({value: value})
  }

  submitDeckTitle = () => {
    const { value } = this.state

   getDecks().then(res => {
    console.log('Decks before: ', res)
    if (res === null) {
      saveDeckTitle(value)
      this.props.navigation.navigate('Deck List')
      this.setState({value: ''})
    } else {
      if (Object.keys(res).some(e => e === value)) {
        Alert.alert(
          'Error',
          'Already existing deck',
          [{text: 'OK', onPress: () => console.log('OK Pressed')},],
          {cancelable: false},
        )
      } else {
        saveDeckTitle(value)
        this.props.navigation.navigate('Deck List')
        this.setState({value: ''})
      }
    }
    
    console.log('---------------NewDeck-------------------')
    })
  }

  render() {
    const { value } = this.state
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default NewDeck