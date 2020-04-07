import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Card(props) {
  const { question, answer } = props
  return (
    <View style={styles.container}>
      <Text>{question}</Text>
      <Text>{answer}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
})