require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('welcomeMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });
    socket.broadcast.emit('newUserConnected', {
        from: 'Admin', 
        text: 'New User join the chat!'
    });

    // socket.emit('newMessage', {
    //     from: 'JMBG',
    //     text: 'Hi!!!, I´m over here',
    //     createdAt: new Date()
    // });

    socket.on('createMessage', (message) => {
        console.log('New message created:', message);


        // Emit to all connected user
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // Broadcast, all except the one who emit the message
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Starting express server in port ${port}`);
});