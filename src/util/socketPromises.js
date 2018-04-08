import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

export function connect() {
    const socket = io('http://sashanks-pro.wv.cc.cmu.edu:3337/chat');
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        })
    })
}

export function on(socket, event) {
    return eventChannel(emit => {
        socket.on(event, data => {
            emit(data);
        })
        return () => {} 
    })
}
