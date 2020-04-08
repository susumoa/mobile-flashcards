import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Card from './Card'

export default function CardList(props) {
  const { deck } = props.route.params
  return (
    <View style={styles.cardListContainer}>
      <FlatList
        data={deck.questions}
        keyExtractor={item => `${item.question}-${new Date}`}
        renderItem={({item}) => (
          <Card question={item.question} answer={item.answer}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardListContainer: {
    margin: 10,
    marginTop: 0,
  },
})