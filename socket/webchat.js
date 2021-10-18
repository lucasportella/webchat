const webchatController = require('../controllers/webchatController');

const socketMessage = (io, socket) => {
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
        let databaseNickname;
        const nicknameId = socket.id.slice(0, 16);
        const currentNickname = nicknameId;
        console.log(`${currentNickname} conectado!`);
        socket.emit('currentNickname', currentNickname);
        databaseNickname = currentNickname;
        webchatController.addOnlineUser({ nicknameId, databaseNickname });
        socket.on('currentNickname', (nickname) => {
            socket.emit('changeNickname', nickname);
        });
        
        socket.broadcast.emit('broadcastNickname', currentNickname);

        socketMessage(io, socket);
    });
};
