import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'

class Quiz extends Component {
  state = {
    showQuestion: true,
    cardCounter: 0,
    pointCounter: 0,
    endOfQuiz: false
  }

  showOtherSide = () => {
    this.setState((prev) => ({
      showQuestion: !prev.showQuestion
    }))
  }

  restartQuiz = () => {
    this.setState({
      showQuestion: true,
      endOfQuiz: false
    })
    this.props.navigation.navigate('Quiz')
  }

  userAnswer = (num) => {
    const { deck } = this.props.route.params
    const { questions } = deck
    const numOfQuestions = questions.length
    this.setState(prev => ({
      pointCounter: prev.pointCounter + num,
      cardCounter: prev.cardCounter + 1,
      showQuestion: true
    }))
    if (this.state.cardCounter + 1 === numOfQuestions - 1) {
      this.setState({
        endOfQuiz: true
      })
    }
  }

  setEndOfQuiz = () => {
    this.setState({
      endOfQuiz: false
    })
  }

  render() {
    const { showQuestion, cardCounter, endOfQuiz } = this.state
    const { deck } = this.props.route.params
    const { title, questions } = deck
    const numOfQuestions = questions.length

    // console.log('Quiz deck: ', deck)
    // console.log('Points: ', this.state.pointCounter)
    // console.log('Card counter: ', this.state.cardCounter)
    // console.log('End of quiz: ', this.state.endOfQuiz)

    function Question(props) {
      return(
        <View>
          <Text style={styles.header}>{title} Quiz</Text>
          <Text>{cardCounter + 1}/{numOfQuestions}</Text>
          <View>
            <Text>{questions[cardCounter].question}</Text>
            <TouchableOpacity
              onPress={props.showOtherSide}
              style={styles.cardTurnBtn}
              >
              <MaterialIcons name='chat-bubble' />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    function Answer(props) {
      return(
        <View>
          <Text style={styles.header}>{title} Quiz</Text>
          <Text>{cardCounter + 1}/{numOfQuestions}</Text>
          <View>
            <Text>{questions[cardCounter].answer}</Text>
            <TouchableOpacity
              onPress={props.showOtherSide}
              style={styles.cardTurnBtn}
              >
              <FontAwesome name='question' />
            </TouchableOpacity>
          </View>

          <View style={styles.answerBtnContainer}>
            <TouchableOpacity
              style={styles.answerBtn}
              onPress={() => props.userAnswer(1)}
            >
              <AntDesign name='checksquare' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.answerBtn}
              onPress={() => props.userAnswer(0)}
            >
              <AntDesign name='closesquare' />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {!endOfQuiz
          ? <View>
              {showQuestion
                ? <Question
                    showOtherSide={this.showOtherSide}
                  />
                : <Answer
                    showOtherSide={this.showOtherSide}
                    userAnswer={this.userAnswer}
                  />
              }
            </View>
          : <View>
              <Text>End of quiz</Text>
              <TouchableOpacity
                style={styles.navigationBtn}
                onPress={() => this.props.navigation.navigate('Deck')}
              >
                <Text>Back to deck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigationBtn}
                onPress={this.restartQuiz}
              >
                <Text>Restart quiz</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  cardTurnBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 45,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  answerBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 45,
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
  navigationBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Quiz