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

const nicknameStart = (io, socket) => {
   const nicknameId = socket.id.slice(0, 16);
   const databaseNickname = nicknameId;
   
    console.log(`${nicknameId} conectado!`);
    // socket.emit('currentNickname', currentNickname);
    
    const updatedOnlineUsers = webchatController
    .addOnlineUser({ nicknameId, databaseNickname });
    io.emit('onlineUsers', updatedOnlineUsers);
    return nicknameId;
};

const connection = (io) => {
    io.on('connection', (socket) => {
       const nicknameId = nicknameStart(io, socket);

        socket.on('currentNickname', (nickname) => {
            socket.emit('changeNickname', nickname);
            const updatedOnlineUsers = webchatController
            .changeUserNickname({ nicknameId, databaseNickname: nickname });
            io.emit('onlineUsers', updatedOnlineUsers);
        });

        socketMessage(io, socket);

        socket.on('disconnect', () => {
           const updatedOnlineUsers = webchatController.removeOnlineUser(nicknameId);
            io.emit('onlineUsers', updatedOnlineUsers);
        });
    });
};

module.exports = connection;