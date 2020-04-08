import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {
  state = {
    showQuestion: true,
    cardCounter: 0,
    pointCounter: 0,
    endOfQuiz: false,
    opacity: new Animated.Value(1)
  }

  showOtherSide = () => {
    const { opacity } = this.state
      Animated.timing(opacity, {duration: 500, toValue: 0}).start()
    setTimeout(() => 
      Animated.timing(opacity, {duration: 1000, toValue: 1}).start(), 500)
      setTimeout(() =>
    this.setState((prev) => ({
      showQuestion: !prev.showQuestion
    })), 500)
  }

  restartQuiz = () => {
    const { deck } = this.props.route.params
    this.setState({
      showQuestion: true,
      endOfQuiz: false,
      cardCounter: 0,
      pointCounter: 0,
    })
    this.props.navigation.navigate('Quiz', {deck: deck})
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
    if (this.state.cardCounter + 1 === numOfQuestions) {
      clearLocalNotification()
        .then(setLocalNotification)
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
    const { showQuestion, cardCounter, endOfQuiz, pointCounter, opacity } = this.state
    const { deck } = this.props.route.params
    const { title, questions } = deck
    const numOfQuestions = questions.length
    const percentage = Math.round(pointCounter / numOfQuestions * 100)

    function Question(props) {
      return(
        <View>
          <Text>{cardCounter + 1}/{numOfQuestions}</Text>
          <Animated.View style={[styles.container, {opacity}]}>
            <Text>{questions[cardCounter].question}</Text>
            <TouchableOpacity
              onPress={props.showOtherSide}
              style={styles.cardTurnBtn}
              >
              <MaterialIcons name='chat-bubble' />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )
    }

    function Answer(props) {
      return(
        <View>
          <Text>{cardCounter + 1}/{numOfQuestions}</Text>
          <Animated.View style={[styles.container, {opacity}]}>
            <Text>{questions[cardCounter].answer}</Text>
            <TouchableOpacity
              onPress={props.showOtherSide}
              style={styles.cardTurnBtn}
              >
              <FontAwesome name='question' />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.answerBtnContainer, {opacity}]}>
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
          </Animated.View>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.header}>{title} Quiz</Text>
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
              <Text>{pointCounter} out of {numOfQuestions}</Text>
              <Text>{percentage}%</Text>
              {percentage >= 50
                ? <Text>You passed!</Text>
                : <View>
                    <Text>You failed</Text>
                    <Text>Keep learning and try again!</Text>
                  </View>
              }
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
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e1f2fb',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 150,
  },
  cardTurnBtn: {
    backgroundColor: '#b4dff5',
    borderRadius: 5,
    height: 45,
    width: 45,
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
  question: {
    fontSize: 25,
    textAlign: 'center',
  },
  answer: {
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
    color: '#666666'
  },
})

export default Quiz