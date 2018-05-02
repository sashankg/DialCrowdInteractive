import { combineReducers } from 'redux';
import messages from './messagesReducer';
import listening from './listeningReducer';
import mode from './modeReducer';
import help from './helpReducer';

export default combineReducers({
    messages,
    listening,
    mode,
    help,
});

