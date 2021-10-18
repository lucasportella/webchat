const webchatModel = require('../models/webchatModel');

const addOnlineUser = (payload) => {
    webchatModel.addOnlineUser(payload);
};

const root = async (req, res) => {
    const messages = await webchatModel.getMessages();
    res.render('webchat.ejs', { messages, onlineUsers: webchatModel.onlineUsers });
};

const saveMessage = async (payload) => {
    const result = await webchatModel.saveMessage(payload);
};

module.exports = {
    root,
    saveMessage,
    addOnlineUser,
};
