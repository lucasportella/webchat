const socket = window.io();

const form = document.querySelector('form');
const input = document.querySelector('#textInput');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('message', input.value);
});
