import { 
    call, 
    takeEvery, 
    takeLatest,
    put, 
    fork,
    take
} from 'redux-saga/effects';
import queryString from 'query-string';
import axios from 'axios';
import { connect, on } from '../util/socketPromises';
import { listen } from '../util/speechPromises';

import { addMessage, sendMessage } from '../actions/messageActions';
import { stopMicrophone } from '../actions/microphoneActions';

export default function* rootSaga() {
    const params = queryString.parse(window.location.search)

    if(params.option) {
        yield put({ type: 'MODE_CHANGE', mode: params.option })
    }
    if(params.help) {
        yield put({ type: 'HELP_UPDATE', text: params.help })
    }

    const socket = yield call(connect);
    const sid = Date.now() + "\t" + (params.ip || "");
    socket.emit('join', { sid });

    const sessionData = {
        sid,
        userId: params.userID || "notProvided",
        subId: params.subId || "notProvided",
        nameOfDialog: params.name_of_dialog || "notProvided",
    }

    yield takeEvery(on(socket, 'status'), receiveStatusSaga)

    const synth = window.speechSynthesis;
    yield takeEvery(on(socket, 'message'), receiveMessageSaga, synth, sessionData);
    yield takeEvery('MESSAGE_SEND', sendMessageSaga, socket, sessionData);
    yield fork(microphoneSaga, synth)
}

function* receiveStatusSaga(data) {
    yield put(addMessage(data.msg, Date.now(), true));
}

function* receiveMessageSaga(synth, sessionData, messageData) {
    const message = messageData.msg;
    yield put(addMessage(message, Date.now(), true));
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
    yield fork(logMessage, sessionData, message, "Bot")
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

function* microphoneSaga(synth) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US'
    //recognition.continuos = true;
    recognition.interim = true;

    yield takeLatest('MICROPHONE_START', microphoneCancelSaga, recognition)

    while(true) {
        yield take('MICROPHONE_START');
        synth.cancel();
        try {
            const event = yield call(listen, recognition);
            var result = event.results[0][0].transcript;
            if(result === "start") {
                result = "START"
            }
            yield put(sendMessage(result, Date.now()));
            yield put(stopMicrophone());
        }
        catch(error) {
            console.log(error);
            yield put(stopMicrophone());
        }
    }
}

function* microphoneCancelSaga(recognition) {
    yield take('MICROPHONE_CANCEL');
    recognition.stop();
    yield put(stopMicrophone());
}
