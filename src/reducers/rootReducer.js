import { combineReducers } from 'redux';
import messages from './messagesReducer';
import listening from './listeningReducer';
import mode from './modeReducer';

export default combineReducers({
    messages,
    listening,
    mode
});

