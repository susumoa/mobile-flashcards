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
      const data = JSON.parse(decks)
      return data[id]
    })
}

export function saveDeckTitle(deckTitle) {
  const deck = {
    [deckTitle]: {
      title: deckTitle,
      questions: [],
      lastTried: null
    }
  }
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
    .then((res) => {
      return res
    })

}

export function addCardToDeck(deckTitle, question, answer) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks)
      const deck = {
        [deckTitle]: {
          title: deckTitle,
          questions: [
            ...data[deckTitle].questions,
            {
              question: question,
              answer: answer,
            }
          ],
          ...data[deckTitle].lastTried
        }
      }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
        .then((res) => {
          return res
        })
    })
}

export function addLastTriedDate(deckTitle, date) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks)
      const deck = {
        [deckTitle]: {
          title: deckTitle,
          questions: [
            ...data[deckTitle].questions,
          ],
          lastTried: date
        }
      }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
        .then((res) => {
          return res
        })
    })
}