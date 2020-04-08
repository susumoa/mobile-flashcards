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
          if (value !== '') {
            saveDeckTitle(value)
              .then(() => {
                getDeck(value).then(r => {
                  props.navigation.navigate('Deck', {deckId: r.title})
                })
                setValue('')
              })
          } else {
            Alert.alert(
              '',
              "Don't forget to give the deck a title",
              [{text: 'OK', onPress: () => console.log('OK Pressed')},],
              {cancelable: false},
            )
          }
        }
      }
    })
  }

  return (
    <View>
      <Text style={styles.header}>Create new deck</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder='Deck Title'
        />
        <TouchableOpacity
          onPress={submitDeckTitle}
          style={styles.submitBtn}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 0,
    padding: 10,
  },
  header: {
    paddingTop: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#333333',
    borderWidth: 1,
  },
  submitBtn: {
    backgroundColor: '#5e7f91',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
  },
})

export default NewDeck