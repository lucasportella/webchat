const socket = window.io();

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('#textInput');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('message', { chatMessage: input.value, nickname: socket.id });
});

socket.on('message-return', (formattedMessage) => {
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    ul.appendChild(li);
});
