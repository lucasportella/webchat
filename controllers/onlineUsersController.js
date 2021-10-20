const webchatModel = require('../models/webchatModel');

const addOnlineUser = (payload) => webchatModel.addOnlineUser(payload);

const removeOnlineUser = (nicknameId) => webchatModel.removeOnlineUser(nicknameId);

const changeUserNickname = (payload) => webchatModel.changeUserNickname(payload);

module.exports = {
    addOnlineUser,
    removeOnlineUser,
    changeUserNickname,
};