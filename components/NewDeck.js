import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { saveDeckTitle, getDecks, getDeck } from '../utils/api'

function NewDeck(props) {
  const [value, setValue] = useState('')

  

  onChange = (value) => {
    setValue(value)
  }

  submitDeckTitle = () => {
    getDecks().then(res => {
      if (res === null) {
        saveDeckTitle(value)
          .then(() => {
            getDeck(value).then(r => {
              props.navigation.navigate('Deck', {deckId: r.title})
            })
            setValue('')
          })
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
          .then(() => {
            getDeck(value).then(r => {
              props.navigation.navigate('Deck', {deckId: r.title})
            })
            setValue('')
          })
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create new deck</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder='Deck Title'
      />
      <TouchableOpacity onPress={submitDeckTitle}>
        <Text>Submit New Deck</Text>
      </TouchableOpacity>
    </View>
  )
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
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
})

export default NewDeck