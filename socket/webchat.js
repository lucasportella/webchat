module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`${socket.id} conectado!`);

        socket.on('message', (msgObject) => {
            const { chatMessage, nickname } = msgObject;
            const formattedMessage = `- ${nickname}: ${chatMessage}`;
            io.emit('message-return', formattedMessage);
        });
    });
};
