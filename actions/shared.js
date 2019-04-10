import { getInitialData } from '../utils/api';
import { fetchInitialData } from '../utils/api';
import { receiveDecks } from './decks';
import { receiveQuestions } from './questions';


export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ decks, questions }) => {
                dispatch(receiveDecks(decks));
                dispatch(receiveQuestions(questions));
            })
    }
}

export function handleInitialDataStorage() {
    return (dispatch) => {
        return fetchInitialData()
            .then(({ decks, questions }) => {
                dispatch(receiveDecks(decks));
                dispatch(receiveQuestions(questions));
            })
    }
}
