module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`${socket.id} conectado!`);

        socket.on('message', (payload) => {
            const { chatMessage, nickname, formattedDate } = payload;

            const formattedMessage = `${formattedDate} - ${nickname}: ${chatMessage}`;
            
            io.emit('message-return', formattedMessage);
        });
    });
};
