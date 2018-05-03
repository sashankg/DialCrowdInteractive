export default function messagesReducer(state, action) {
    switch(action.type) {
        case 'MESSAGE_ADD':
            return  state.concat([{
                text: action.text,
                time: action.time,
                received: action.received,
            }])
        default: 
            return state || []
    }
}

