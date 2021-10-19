const connection = require('./connection');

let onlineUsers = [];
const addOnlineUser = (payload) => {
    onlineUsers.push(payload);
    return onlineUsers;
};

const removeOnlineUser = (nicknameId) => {
    onlineUsers = onlineUsers.filter((user) => user.nicknameId !== nicknameId).slice();
    return onlineUsers;
};

const changeUserNickname = (payload) => {
    onlineUsers = onlineUsers.map((user) => {
        if (user.nicknameId === payload.nicknameId) {
            return { nicknameId: payload.nicknameId, databaseNickname: payload.databaseNickname };
        }
        return user;
    }).slice();
    return onlineUsers;
};

const getMessages = async () => {
    const db = await connection();
    const messages = await db.collection('messages').find().toArray();
    const formattedMessages = messages.map((message) =>
    `${message.timestamp} - ${message.nickname}: ${message.message}`);
    return formattedMessages;
};

const saveMessage = async (payload) => {
    const { chatMessage, nickname, formattedDate } = payload;
    const db = await connection();
    const data = { message: chatMessage, nickname, timestamp: formattedDate };
    return db.collection('messages').insertOne(data);
};

module.exports = {
    onlineUsers,
    getMessages,
    saveMessage,
    addOnlineUser,
    removeOnlineUser,
    changeUserNickname,
};
