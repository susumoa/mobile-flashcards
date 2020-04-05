import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class Deck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Deck Title</Text>
        <Text style={styles.center}>{3} cards</Text>
        <View>
          <TouchableOpacity style={styles.addBtn} onPress={() => this.props.navigation.navigate('New Card')}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizBtn} onPress={() => this.props.navigation.navigate('Quiz')}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  addBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizBtn: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 100,
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
})

export default Deck