const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`${socket.id} conectado!`);
});

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'));
});

app.set('view engine', 'ejs');
app.set('views', './views');

http.listen(PORT, () => {
    console.log(`Ouvindo na porta ${PORT}`);
});