import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import DeckTeaser from './DeckTeaser'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDecks } from '../utils/api'


function DeckList(props) {
  const [ deckList, setDeckList ] = useState({})
  const isFocused = useIsFocused()

  console.log('-----------Decklist Start------------')

  useEffect(() => {
    getDecks().then(res => {
      res === null
        ? setDeckList({})
        : setDeckList(res)
    })
  }, [isFocused])

    console.log('Decklist: ', deckList)
    console.log('Object key decklist: ', Object.keys(deckList))
    console.log('-----------Decklist End------------')

    return (
      <View>
        {Object.keys(deckList).length === 0 || deckList === undefined
          ? <Text>No decks to show</Text>
          : <FlatList
            data={Object.keys(deckList)}
            keyExtractor={item => deckList[item].title}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => props.navigation.navigate('Deck', {deckId: deckList[item].title})}>
                <DeckTeaser title={deckList[item].title} numOfCards={deckList[item].questions ? deckList[item].questions.length : 0} />
              </TouchableOpacity>
            )}
          />
        }
      </View>
    )

}

export default DeckList