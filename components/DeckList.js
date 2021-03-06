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
      <View style={styles.deckListContainer}>
        {Object.keys(deckList).length === 0 || deckList === undefined
          ? <View style={styles.noShowContainer}>
              <Text style={styles.noShow}>No decks to show</Text>
            </View>
          : <FlatList
            data={Object.keys(deckList)}
            keyExtractor={item => deckList[item].title}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.deck}
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
  noShow: {
    textAlign: 'center',
    fontSize: 25,
    color: '#666',
  },
  noShowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    margin: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#333333',
    borderWidth: 1,
    backgroundColor: '#e1f2fb',
  },
})

export default DeckList