import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getDeck } from '../utils/api'
import DeckTeaser from './DeckTeaser'

function Deck(props) {
  const [deck, setDeck] = useState({})
  const isFocused = useIsFocused()
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const { deckId } = props.route.params
    getDeck(deckId).then(res => {
      setDeck(res)
      setStatus(true)
    })
  }, [isFocused])

  const numOfCards = deck.questions === undefined ? 0 : deck.questions.length

  if (status === false) {
    return <ActivityIndicator /> 
  }

  return (
    <View style={styles.container}>
      <DeckTeaser title={deck.title} numOfCards={numOfCards} />
      <View>
        <TouchableOpacity style={styles.addBtn} onPress={() => props.navigation.navigate('New Card', {deck: deck})}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quizBtn, {backgroundColor: numOfCards === 0 ? 'white' : 'gray'}]}
          disabled={numOfCards === 0 ? true : false}
          onPress={() => props.navigation.navigate('Quiz', {deck: deck})}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        {numOfCards !== 0 &&
        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => props.navigation.navigate('Card List', {deck: deck})}
        >
          <Text>View Cards</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  addBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
})

export default Deck