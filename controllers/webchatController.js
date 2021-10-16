const webchatModel = require('../models/webchatModel');

const root = async (req, res) => {
    const messages = await webchatModel.getMessages();
    res.render('webchat.ejs', { messages });
};

const saveMessage = async (payload) => {
    const result = await webchatModel.saveMessage(payload);
};

module.exports = {
    root,
    saveMessage,
};
