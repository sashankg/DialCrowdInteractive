import { 
    call, 
    put, 
    all,
} from 'redux-saga/effects';
import queryString from 'query-string';

import { connect } from '../util/socketPromises';

import microphoneSaga from './microphoneSaga';
import messagesSaga from './messagesSaga';

export default function* rootSaga() {
    const params = queryString.parse(window.location.search)

    if(params.option) {
        const option = params.option === "continuous" ? "speech" : params.option
        yield put({ type: 'MODE_CHANGE', mode: option })
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
        mode: params.option,
    }

    const synth = window.speechSynthesis;

    yield all([
        call(messagesSaga, sessionData, socket, synth),
        call(microphoneSaga, synth)
    ])
}
