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


    Object.keys(getDecks()).some((e) => e === value)
        ? Alert.alert(
          'Error',
          'Already existing title',
          [{text: 'OK', onPress: () => console.log('OK Pressed')},],
          {cancelable: false},
        )
        : saveDeckTitle(value)

    // return saveDeckTitle(value)
    //   .then(console.log(getDecks()))
    //   .then(this.props.navigation.navigate('New Deck'))
    //   .then(console.log('submitted'))
      // saveDeckTitle(value)
      console.log('Decks: ', getDecks())
      this.setState({value: ''})
    

    // AsyncStorage.saveDeckTitle
    //check if existing title

    // route to the new deck
    

    
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