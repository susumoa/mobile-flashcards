import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDecks } from '../utils/api'
import DeckTeaser from './DeckTeaser'


function DeckList(props) {
  const [ deckList, setDeckList ] = useState({})
  const isFocused = useIsFocused()
  const [status, setStatus] = useState(false)

  useEffect(() => {
    getDecks().then(res => {
      if (res === null) {
        setDeckList({})
      } else {
        setDeckList(res)
      }
      setStatus(true)
    })
  }, [isFocused])

    if (status === false) {
      return <ActivityIndicator /> 
    }

    return (
      <View>
        {Object.keys(deckList).length === 0 || deckList === undefined
          ? <Text>No decks to show</Text>
          : <FlatList
            data={Object.keys(deckList)}
            keyExtractor={item => deckList[item].title}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.deckContainer}
                onPress={() => props.navigation.navigate('Deck', {deckId: deckList[item].title})}
              >
                <DeckTeaser title={deckList[item].title} numOfCards={deckList[item].questions ? deckList[item].questions.length : 0} />
              </TouchableOpacity>
            )}
          />
        }
      </View>
    )
}

const styles = StyleSheet.create({
  deckContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e1f2fb',
  },
})

export default DeckList