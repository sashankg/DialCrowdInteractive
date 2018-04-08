import { 
    call, 
    takeEvery, 
    takeLatest,
    put, 
    fork,
    take
} from 'redux-saga/effects';
import queryString from 'query-string';
import { connect, on } from '../util/socketPromises';
import { listen } from '../util/speechPromises';

import { addMessage, sendMessage } from '../actions/messageActions';
import { startMicrophone, stopMicrophone } from '../actions/microphoneActions';

export default function* rootSaga() {
    const params = queryString.parse(window.location.search)
    console.log(params)

    if(params.option) {
        yield put({ type: 'MODE_CHANGE', mode: params.option })
    }

    const socket = yield call(connect);
    const sid = Date.now() + "\t" + (params.ip ? params.ip : "");
    socket.emit('join', { sid });

    yield takeEvery(on(socket, 'status'), receiveStatusSaga)

    const synth = window.speechSynthesis;
    yield takeEvery(on(socket, 'message'), receiveMessageSaga, synth);
    yield takeEvery('MESSAGE_SEND', sendMessageSaga, socket, sid);
    yield fork(microphoneSaga, synth)
}

function* receiveStatusSaga(data) {
    yield put(addMessage(data.msg, Date.now(), true));
}

function* receiveMessageSaga(synth, data) {
    const message = data.msg;
    yield put(addMessage(message, Date.now(), true));
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
}

function* sendMessageSaga(socket, sid, action) {
    yield put(addMessage(action.text, action.time, false));
    socket.emit('usr_input', { msg: action.text, sid });
}

function* microphoneSaga(synth) {
    const recognition = new window.webkitSpeechRecognition();
    //recognition.continuos = true;
    recognition.interim = true;

    yield takeLatest('MICROPHONE_START', microphoneCancelSaga, recognition)
    console.log('sfksjdfh');

    while(true) {
        yield take('MICROPHONE_START');
        synth.cancel();
        try {
            const event = yield call(listen, recognition);
            console.log(event);
            const result = event.results[0][0].transcript;
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
