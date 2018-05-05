export function listen(recognition) {
    return new Promise((resolve, reject) => {
        recognition.onerror = (error) => {
            reject(error);
        }
        recognition.onresult = (event) => {
            resolve(event)
        }
        recognition.onnomatch = (e) => {
            resolve(e)
        }
        recognition.start();
    })
}

export function speak(synth, utterance) {
    return new Promise((resolve) => {
        utterance.onend = resolve
        synth.speak(utterance)
    })
}
