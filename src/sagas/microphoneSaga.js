import {
    take,
    call,
    put,
    race,
} from 'redux-saga/effects';

import { sendMessage } from '../actions/messageActions';
import { stopMicrophone } from '../actions/microphoneActions';
import { listen } from '../util/speechPromises';

export default function* microphoneSaga(synth) {
    while(true) {
        yield take('MICROPHONE_START');
        synth.cancel();
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US'
        //recognition.continuos = true;
        recognition.interim = true;
        try {
            const { event } = yield race({
                event: call(listen, recognition),
                cancel: take('MICROPHONE_CANCEL')
            });

            if(event) {
                var result = event.results[0][0].transcript;
                if(result === "start") {
                    result = "START"
                }
                yield put(sendMessage(result, Date.now()));
            }
            else {
                recognition.stop();
            }
        }
        catch(error) {
            console.log(error);
        }
        yield put(stopMicrophone());
    }
}
