export default function helpReducer(state, action) {
    switch(action.type) {
        case 'HELP_UPDATE':
            return action.text
        default:
            return state || "Lorem ipsum"
    }
}

