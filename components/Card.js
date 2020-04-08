import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Card(props) {
  const { question, answer } = props
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#e1f2fb',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
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