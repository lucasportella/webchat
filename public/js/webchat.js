const socket = window.io();

let nickname;
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
    nicknameInput.value = '';
    const span = document.createElement('span');
    socket.emit('currentNickname', nickname);
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
        nickname,
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

socket.on('currentNickname', (currentNickname) => {
    nickname = currentNickname;
    const h2 = document.querySelector('#welcome-message');
    const h3 = document.createElement('h3');
    h3.setAttribute('id', 'current-nickname-message');
    h3.innerText = `Seu nickname atual é ${currentNickname}.`;
    h2.parentNode.insertBefore(h3, h2.nextSibling);
});

socket.on('changeNickname', (newNickname) => {
    const h3 = document.querySelector('#current-nickname-message');
    h3.innerText = `Seu nickname atual é ${newNickname}.`;
});