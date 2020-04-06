export function formatDeck( title, question, answer ) {
  return {
    title: {
      title: title,
      questions: [
        {
          question: question,
          answer: answer,
        }
      ]
    },
  }
}