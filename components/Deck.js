import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck } from '../utils/api'
import DeckTeaser from './DeckTeaser'

class Deck extends Component {
  state = {
    deck: {}
  }

  componentDidMount() {
    const { deckId } = this.props.route.params
    console.log('---------------Deck Start--------------------')
    console.log('Deck id: ', deckId)
    getDeck(deckId).then(res => {
      console.log('Deck mount res: ', res)
      console.log('---------------Deck End--------------------')
      this.setState({deck: res})
    })
  }

  render() {
    const { deck } = this.state

    const numOfCards = deck.questions === undefined ? 0 : deck.questions.length

    return (
      <View style={styles.container}>
        <DeckTeaser title={deck.title} numOfCards={numOfCards} />
        <View>
          <TouchableOpacity style={styles.addBtn} onPress={() => this.props.navigation.navigate('New Card')}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizBtn} onPress={() => this.props.navigation.navigate('Quiz')}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
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
    marginLeft: 40,
    marginRight: 40,
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