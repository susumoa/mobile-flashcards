import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

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

    // route to the new deck
    this.props.navigation.navigate('Deck')

    console.log('submitted')
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