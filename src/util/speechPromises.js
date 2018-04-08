export function listen(recognition) {
    return new Promise((resolve, reject) => {
        recognition.onerror = (error) => {
            reject(error);
        }
        recognition.onresult = (event) => {
            resolve(event)
        }
        recognition.start();
    })
}
