import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'

class Quiz extends Component {
  state = {
    showQuestion: true
  }

  showOtherSide = () => {
    this.setState((prev) => ({
      showQuestion: !prev.showQuestion
    }))
  }

  restartQuiz = () => {
    this.setState({showQuestion: true})
    this.props.navigation.navigate('Quiz')
  }

  render() {
    const { showQuestion } = this.state

    return (
      <View>
        <View>
          {showQuestion 
          ? <View>
              <Text>Deck 1 Quiz</Text>
              <Text>1/10</Text>
              <View>
                <Text>Question</Text>
                <TouchableOpacity onPress={this.showOtherSide}>
                  <MaterialIcons name='chat-bubble' />
                </TouchableOpacity>
              </View>
            </View>
          : <View>
              <Text>Deck 1 Quiz</Text>
              <Text>1/10</Text>
              <View>
                <Text>Answer</Text>
                <TouchableOpacity onPress={this.showOtherSide}>
                  <FontAwesome name='question' />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <AntDesign name='checksquare' />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name='closesquare' />
                </TouchableOpacity>
              </View>
            </View>}
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <Text>Back to deck</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.restartQuiz}>
          <Text>Restart quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Quiz