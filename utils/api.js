import {
    _getDecks,
    _getQuestions,
} from './_DATA.js'

import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'DECKS'
const QUESTIONS_STORAGE_KEY = 'QUESTIONS'

/**
 *  Mookup Functions for ./DATA.js 
 */

export function getInitialData() {
    return Promise.all([
        _getDecks(),
        _getQuestions(),
    ]).then(([decks, questions]) => ({
        decks,
        questions,
    }))
}

/**
 *  AsyncStorage Functions
 */
function _fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
}



function _fetchQuestions() {
    return AsyncStorage.getItem(QUESTIONS_STORAGE_KEY)
        .then((results) => {
            return JSON.parse(results)
        })
}

export function fetchInitialData() {
    return Promise.all([
        _fetchDecks(),
        _fetchQuestions(),
    ]).then(([decks, questions]) => ({
        decks,
        questions,
    }))
}

export function saveDeck({ title, deck }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck,
    }))

}


export function saveCard({ id, card }) {
    return AsyncStorage.mergeItem(QUESTIONS_STORAGE_KEY, JSON.stringify({
        [id]: card,
    }))

}
