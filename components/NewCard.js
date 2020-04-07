import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addCardToDeck } from '../utils/api'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onChangeQuestion = (value) => {
    this.setState(() => ({
      question: value
    }))
  }

  onChangeAnswer = (value) => {
    this.setState(() => ({
      answer: value
    }))
  }

  submitCard = () => {
    const { navigation, route } = this.props
    const { deck } = route.params
    const { question, answer } = this.state

    console.log('New card props: ', deck)

    addCardToDeck(deck.title, question, answer).then(
      navigation.navigate('Deck', {deckId: deck.title})
    )
    
    console.log('submitted')
  }

  render() {
    const { question, answer } = this.state
    return (
      <View>
        <Text>New Card</Text>
        <TextInput
          value={question}
          id='question'
          onChangeText={this.onChangeQuestion}
          placeholder='Question'
        />
        <TextInput
          value={answer}
          id='answer'
          onChangeText={this.onChangeAnswer}
          placeholder='Answer'
        />
        <TouchableOpacity onPress={this.submitCard}>
          <Text>Submit New Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewCard