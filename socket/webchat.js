const webchatController = require('../controllers/webchatController');

const socketMessage = (io, socket) => {
    socket.on('currentNickname', (nickname) => {
        socket.emit('changeNickname', nickname);
    });

    socket.on('message', async (payload) => {
        const { chatMessage, nickname } = payload;

        const date = new Date();
        const brazilianDate = date.toLocaleDateString();
        const timeHMS = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const formattedDate = `${brazilianDate} ${timeHMS}`;

        await webchatController.saveMessage({ chatMessage, nickname, formattedDate });

        const formattedMessage = `${formattedDate} - ${nickname}: ${chatMessage}`;
        
        io.emit('message', formattedMessage);
    });
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`${socket.id} conectado!`);
        const currentNickname = socket.id.slice(0, 16);
        socket.emit('currentNickname', currentNickname);
        socket.broadcast.emit('broadcastNickname', currentNickname);

        socketMessage(io, socket);
    });
};
