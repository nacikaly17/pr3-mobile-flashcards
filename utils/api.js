import {
    _getDecks,
    _getQuestions,
    _saveDeck,
    _saveQuestion,
} from './_DATA.js'

export function getInitialData() {
    return Promise.all([
        _getDecks(),
        _getQuestions(),
    ]).then(([decks, questions]) => ({
        decks,
        questions,
    }))
}

export function saveDeck(title) {
    return _saveDeck(title)
}

export function saveQuestion(card) {
    return _saveQuestion(card)
}


