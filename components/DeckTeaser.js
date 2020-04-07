import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class DeckTeaser extends Component {
  render() {
    const { title, numOfCards } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.center}>{numOfCards} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
})

export default DeckTeaser