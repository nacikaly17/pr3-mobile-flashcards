
export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDeck(title) {
    return {
        title: title,
        timestamp: Date.now(),
        questions: []
    }
}

export function formatQuestion({ id, title, question, answer }) {
    return {
        id: id,
        title: title,
        timestamp: Date.now(),
        question: question,
        answer: answer,
    }
}
