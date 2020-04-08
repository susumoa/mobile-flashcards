import React from 'react'
import { View, FlatList } from 'react-native'
import Card from './Card'

export default function CardList(props) {
  const { deck } = props.route.params
  return (
    <View>
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