const socket = window.io();

let nickname;
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
});

const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();
    const brazilianDate = date.toLocaleDateString();
    const timeHMS = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const formattedDate = `${brazilianDate} ${timeHMS}`;
    const payload = { 
        chatMessage: messageInput.value,
        nickname: nickname || socket.id,
        formattedDate };

    socket.emit('message', payload);
});

const ul = document.querySelector('ul');

socket.on('message', (formattedMessage) => {
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    ul.appendChild(li);
});
