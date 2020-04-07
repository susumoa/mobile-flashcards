import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'MobileFlashCards:decklist'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((res) => {
      // console.log('Parsed decks result: ', JSON.parse(res))
      return JSON.parse(res)
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((decks) => {
      return JSON.parse(decks)[id]
    })
}

export function saveDeckTitle(deckTitle) {
  const deck = {
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
    .then((res) => {
      return res
    })

}

// export function addCardToDeck(title, card) {
//   return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
//     .then((results) => {
//       const decks = JSON.parse(results)
//     AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
//       card
//     }))
//   })
// }