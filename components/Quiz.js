import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ActivityIndicator } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/api'
import Question from '../components/Question'
import Answer from '../components/Answer'

class Quiz extends Component {
  state = {
    showQuestion: true,
    cardCounter: 0,
    pointCounter: 0,
    endOfQuiz: false,
    opacity: new Animated.Value(1),
    status: true,
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
    const { opacity } = this.state
    const { deck } = this.props.route.params
    const { questions } = deck
    const numOfQuestions = questions.length
    Animated.timing(opacity, {duration: 500, toValue: 0}).start()
    setTimeout(() =>
      Animated.timing(opacity, {duration: 1000, toValue: 1}).start(), 500)
    setTimeout(() =>
      this.setState(prev => ({
        pointCounter: prev.pointCounter + num,
        cardCounter: prev.cardCounter + 1,
        showQuestion: true
      })), 500)
    if (this.state.cardCounter + 1 === numOfQuestions) {
      clearLocalNotification()
        .then(setLocalNotification)
      this.setState({
        endOfQuiz: true,
        status: false,
      })
      setTimeout(() => {
        this.setState({
          status: true,
        })
      }, 500);
    }
  }

  render() {
    const { showQuestion, cardCounter, endOfQuiz, pointCounter, opacity, status } = this.state
    const { deck } = this.props.route.params
    const { title, questions } = deck
    const numOfQuestions = questions.length
    const percentage = Math.round(pointCounter / numOfQuestions * 100)

    if (status === false) {
      return <ActivityIndicator /> 
    }

    return (
      <View>
        <Text style={styles.header}>{title} Quiz</Text>
        {!endOfQuiz
          ? <View>
              {showQuestion
                ? <Question
                    showOtherSide={this.showOtherSide}
                    cardCounter={cardCounter}
                    numOfQuestions={numOfQuestions}
                    opacity={opacity}
                    questions={questions}
                  />
                : <Answer
                    showOtherSide={this.showOtherSide}
                    userAnswer={this.userAnswer}
                    cardCounter={cardCounter}
                    numOfQuestions={numOfQuestions}
                    opacity={opacity}
                    questions={questions}
                  />
              }
            </View>
          : <View style={styles.statistics}>
              <Text style={styles.header}>Score</Text>
              <Text style={{color: '#666666'}}>{pointCounter} out of {numOfQuestions}</Text>
              <Text style={styles.percentage}>{percentage}%</Text>
              {percentage >= 50
                ? <View style={styles.endOfQuiz}>
                    <Text style={{color: '#666666', fontSize: 20}}>You passed!</Text>
                    </View>
                : <View style={styles.endOfQuiz}>
                    <Text style={{color: '#666666', fontSize: 20}}>You failed</Text>
                    <Text style={{color: '#666666'}}>Keep learning and try again!</Text>
                  </View>
              }
              <TouchableOpacity
                style={styles.navigationBtn}
                onPress={() => this.props.navigation.navigate('Deck')}
              >
                <Text style={styles.btnText}>Back to deck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigationBtn}
                onPress={this.restartQuiz}
              >
                <Text style={styles.btnText}>Restart quiz</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 15,
    fontSize: 25,
    textAlign: 'center',
    color: '#333333',
  },
  statistics: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    paddingTop: 10,
    fontSize: 25,
    color: '#333'
  },
  endOfQuiz: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  navigationBtn: {
    backgroundColor: '#5e7f91',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
  },
  btnText: {
    color: '#fff',
  },
})

export default Quiz