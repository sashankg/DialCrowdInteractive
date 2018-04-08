export default function listeningReducer(state, action) {
    switch(action.type) {
        case 'MICROPHONE_START':
            return true
        case 'MICROPHONE_STOP':
            return false
        default: 
            return state || false
    }
}

