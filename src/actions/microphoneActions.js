export function startMicrophone() {
    return { type: 'MICROPHONE_START' }
}

export function stopMicrophone() {
    return { type: 'MICROPHONE_STOP' }
}

export function cancelMicrophone() {
    return { type: 'MICROPHONE_CANCEL' };
}
