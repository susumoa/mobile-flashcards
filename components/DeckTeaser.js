import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeckTeaser extends Component {
  render() {
    const { title, numOfCards } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.cardNum}>{numOfCards} {numOfCards <= 1 ? 'card' : 'cards'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e1f2fb',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    color: '#333333',
  },
  cardNum: {
    textAlign: 'center',
    color: '#666666',
  },
})

export default DeckTeaser