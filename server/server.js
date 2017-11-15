require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User join the chat!'));

    socket.on('createMessage', (message) => {
        console.log('New message created:', message);

        // Emit to all connected user
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Starting express server in port ${port}`);
});