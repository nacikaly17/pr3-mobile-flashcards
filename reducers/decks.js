import {
    RECEIVE_DECKS,
    ADD_DECK,
} from '../actions/decks'
import { ADD_QUESTION } from '../actions/questions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck,
            }

        case ADD_QUESTION:
            return {
                ...state,
                [action.card.title]: {
                    ...state[action.card.title],
                    questions: state[action.card.title].questions.concat([action.card.id])
                }
            }

        default:
            return state
    }
}

export default decks