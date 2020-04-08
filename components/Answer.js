import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ActivityIndicator } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

export default function Answer(props) {
  const { cardCounter, numOfQuestions, opacity, questions, showOtherSide, userAnswer } = props
  return(
    <View>
      <Text style={styles.questionCounter}>{cardCounter + 1}/{numOfQuestions}</Text>
      <Animated.View style={[styles.container, {opacity}]}>
        <Text style={styles.cardText}>{questions[cardCounter].answer}</Text>
        <TouchableOpacity
          onPress={showOtherSide}
          style={styles.cardTurnBtn}
          >
          <FontAwesome name='question' style={styles.btnIcon} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.answerBtnContainer, {opacity}]}>
        <TouchableOpacity
          style={styles.answerBtn}
          onPress={() => userAnswer(1)}
        >
          <AntDesign name='check' style={styles.btnIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerBtn}
          onPress={() => userAnswer(0)}
        >
          <AntDesign name='close' style={styles.btnIcon} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  questionCounter: {
    color: '#333333',
    marginLeft: 10,
  },
  container: {
    paddingLeft: 10,
    paddingTop: 10,
    margin: 10,
    marginTop: 30,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#333333',
    borderWidth: 1,
    backgroundColor: '#e1f2fb',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    minHeight: 150,
  },
  cardText: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 15,
    maxWidth: Dimensions.get('window').width - 85,
    fontSize: 18,
    textAlign: 'left',
    color: '#333333'
  },
  cardTurnBtn: {
    backgroundColor: '#5e7f91',
    borderRadius: 9,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    height: 45,
    width: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    color: '#fff',
    fontSize: 18,
  },
  answerBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 30,
  },
  answerBtn: {
    backgroundColor: '#5e7f91',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})