const writeMessage = (message: string) => {
    if (typeof process.stdout.clearLine !== 'function') return;
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(message);
}

export default writeMessage;
