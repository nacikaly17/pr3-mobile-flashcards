import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
} from '../actions/questions'

function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                ...action.card,
            }
        default:
            return state
    }
}
export default questions