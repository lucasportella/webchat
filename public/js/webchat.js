const socket = window.io();

let nickname;
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
    nicknameInput.value = '';
    const span = document.createElement('span');
    span.innerHTML = 'nickname salvo com sucesso!';
    nicknameForm.appendChild(span);
    setTimeout(() => {
        span.remove();
    }, 2000);
});

const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = { 
        chatMessage: messageInput.value,
        nickname: nickname || socket.id,
         };
         messageInput.value = '';
    socket.emit('message', payload);
});

const ul = document.querySelector('ul');

socket.on('message', (formattedMessage) => {
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    ul.appendChild(li);
});
