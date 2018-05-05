export function sendMessage(text, time) {
    return { 
        type: 'MESSAGE_SEND', 
        text,
        time,
    }
}

export function addMessage(text, time, received) {
    return {
        type: 'MESSAGE_ADD',
        text,
        time,
        received,
    }
}

export function sendFeedback(text, time, feedback) {
    return {
        type: 'FEEDBACK_SEND',
        text,
        time,
        feedback,
    }
}
