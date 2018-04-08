export default function modeReducer(state, action) {
    switch(action.type) {
        case 'MODE_CHANGE':
            return action.mode;
        default: 
            return state || "both";
    }
}

