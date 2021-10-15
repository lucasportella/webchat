const socket = window.io();

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('#textInput');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('message', input.value);
});

socket.on('message-return', (message) => {
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
});
