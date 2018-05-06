import {
    takeEvery,
    fork,
    call,
    put,
} from 'redux-saga/effects';
import axios from 'axios';

import { addMessage } from '../actions/messageActions';
import { on } from '../util/socketPromises';
import { speak } from '../util/speechPromises';

export default function* messagesSaga(sessionData, socket, synth) {
    yield takeEvery(on(socket, 'status'), receiveStatusSaga)
    yield takeEvery(on(socket, 'message'), receiveMessageSaga, synth, sessionData);
    yield takeEvery('MESSAGE_SEND', sendMessageSaga, socket, sessionData);
}

function* receiveStatusSaga(data) {
    yield put(addMessage(data.msg, Date.now(), true));
}

function* receiveMessageSaga(synth, sessionData, messageData) {
    const message = messageData.msg;
    yield put(addMessage(message, Date.now(), true));
    const utterance = new SpeechSynthesisUtterance(message);
    console.log(utterance)
    yield fork(logMessage, sessionData, message, "Bot")
    yield call(speak, synth, utterance);
    if(sessionData.mode === 'continuous') {
        yield put({ type: 'MICROPHONE_START' })
    }
}

function* sendMessageSaga(socket, data, action) {
    yield put(addMessage(action.text, action.time, false));
    socket.emit('usr_input', { msg: action.text, sid: data.sid });
    yield fork(logMessage, data, action.text, "You")
}

function* logMessage(data, text, role) {
    try {
        const response = yield call(
            axios.post, 
            'https://skylar.speech.cs.cmu.edu:8099/dialog_save', 
            { 
                subId: data.subId,
                userID: data.userId,
                name_of_dialog: data.nameOfDialog, 
                role: role,
                utter: text, 
            })
        console.log(response)
    }
    catch(error) {
        console.log(error)
    }
}
