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
    socket.emit('message', { chatMessage: messageInput.value, nickname: nickname || socket.id });
});

const ul = document.querySelector('ul');

socket.on('message-return', (formattedMessage) => {
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    ul.appendChild(li);
});
