import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getDeck, getDecks } from '../utils/api'
import DeckTeaser from './DeckTeaser'

function Deck(props) {
  const [deck, setDeck] = useState({})
  const isFocused = useIsFocused()
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const { deckId } = props.route.params
    getDecks().then(res => {
      getDeck(deckId)
      .then(res => {
        setDeck(res)
        setStatus(true)
      })}
    )
    
  }, [isFocused])

  const numOfCards = deck.questions === undefined ? 0 : deck.questions.length

  const navigateTo = (view) => {
    
    props.navigation.navigate(view, {deck: deck})
  }

  return (
    !status
      ? <ActivityIndicator /> 
      : <View style={styles.deckContainer}>
      <DeckTeaser title={deck.title} numOfCards={numOfCards} />
      <View>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigateTo('New Card')}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={numOfCards === 0 ? styles.disabledQuizBtn : styles.activeQuizBtn}
          disabled={numOfCards === 0 ? true : false}
          onPress={() => navigateTo('Quiz')}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        {numOfCards !== 0 &&
        <TouchableOpacity
          style={styles.viewCardsBtn}
          onPress={() => navigateTo('Card List')}
        >
          <Text>View Cards</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
    
    
  )
}

const styles = StyleSheet.create({
  deckContainer: {
    padding: 10,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#e1f2fb',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  addBtn: {
    backgroundColor: '#b4dff5',
    padding: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeQuizBtn: {
    backgroundColor: '#b4dff5',
    padding: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledQuizBtn: {
    backgroundColor: '#cad9e1',
    padding: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCardsBtn: {
    backgroundColor: '#b4dff5',
    padding: 10,
    margin: 10,
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