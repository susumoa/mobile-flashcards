import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

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

    // AsyncStorage.addCardToDeck

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