let decks = {
    React: {
        title: 'React',
        timestamp: 1467166872634,
        questions: ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez']
    },
    JavaScript: {
        title: 'JavaScript',
        timestamp: 1467166872634,
        questions: ['am8ehyc8byjqgar0jgpub9']
    },
}

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        title: 'React',
        timestamp: 1467166872634,
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        title: 'React',
        timestamp: 1468479767190,
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        title: 'JavaScript',
        timestamp: 1488579767190,
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
    },

}

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getDecks() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...decks }), 1000)
    })
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000)
    })
}

function formatDeck(title) {
    return {
        title: title,
        timestamp: Date.now(),
        questions: []
    }
}

function formatQuestion(card) {
    return {
        id: generateUID(),
        title: card.title,
        timestamp: Date.now(),
        question: card.question,
        answer: card.answer,
    }
}

export function _saveDeck(title) {
    return new Promise((res, rej) => {
        const formattedDeck = formatDeck(title);
        setTimeout(() => {
            decks = {
                ...decks,
                [formattedDeck.title]: formattedDeck
            }
            res(formattedDeck)
        }, 1000)
    })
}

export function _saveQuestion(card) {
    return new Promise((res, rej) => {
        const title = card.title;
        const formattedQuestion = formatQuestion(card);
        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            }

            decks = {
                ...decks,
                [title]: {
                    ...decks[title],
                    questions: decks[title].questions.concat([formattedQuestion.id])
                }
            }

            res(formattedQuestion)
        }, 1000)
    })
}

