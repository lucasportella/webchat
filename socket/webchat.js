module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`${socket.id} conectado!`);

        socket.on('message', (message) => {
            io.emit('message-return', message);
        });
    });
};
