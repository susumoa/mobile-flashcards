import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getDeck } from '../utils/api'
import DeckTeaser from './DeckTeaser'

function Deck(props) {
  const [deck, setDeck] = useState({})
  const isFocused = useIsFocused()

  useEffect(() => {
    const { deckId } = props.route.params
    getDeck(deckId).then(res => {
      setDeck(res)
    })
  }, [isFocused])

  const numOfCards = deck.questions === undefined ? 0 : deck.questions.length

  return (
    <View style={styles.container}>
      <DeckTeaser title={deck.title} numOfCards={numOfCards} />
      <View>
        <TouchableOpacity style={styles.addBtn} onPress={() => props.navigation.navigate('New Card', {deck: deck})}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizBtn}
          disabled={numOfCards === 0 ? true : false}
          onPress={() => props.navigation.navigate('Quiz', {deck: deck})}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
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