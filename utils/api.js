import AsyncStorage from '@react-native-community/async-storage'

export const FLASHCARD_STORAGE_KEY = 'MobileFlashCards:decklist'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((decks) => {
      return decks[id]
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, title)
}

export function addCardToDeck(title, card) {
  return AsyncStorage.mergeItem((FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: card,
  }))
}