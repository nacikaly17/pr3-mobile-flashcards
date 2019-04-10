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
    Pascal: {
        title: 'Pascal',
        timestamp: 1467166872634,
        questions: []
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
