import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function Question(props) {
  const { cardCounter, numOfQuestions, opacity, questions, showOtherSide } = props
  return(
    <View>
      <Text style={styles.questionCounter}>{cardCounter + 1}/{numOfQuestions}</Text>
      <Animated.View style={[styles.container, {opacity}]}>
        <Text style={styles.cardText}>{questions[cardCounter].question}</Text>
        <TouchableOpacity
          onPress={showOtherSide}
          style={styles.cardTurnBtn}
        >
          <MaterialIcons name='chat-bubble' style={styles.btnIcon} />
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
})