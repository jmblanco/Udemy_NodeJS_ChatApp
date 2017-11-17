require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
var { generateMessage, generateLocationMessage } = require('./utils/message');
var { isRealString } = require('./utils/validations');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

io.on('connection', (socket) => {
    console.log(`New user connected`);

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room is required fields');
        }

        socket.join(params.room);

        //Add user
        users.removeUser(socket.id);        
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

        //To one specific socket
        //io.emit -> io.to(params.room).emit()
        //socket.broadcast.emit() -> socket.broadcast.to(params.room).emit()
        //socket.emit is only for the user that connect
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `User ${params.name} join the room`));

    
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('New message created:', message);

        // Emit to all connected user
        io.emit('newMessage', generateMessage(message.from, message.text));
        
        callback('This is from the server!');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        console.log(`User ${user.name} disconect`);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `User ${user.name} has left`));
        }
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Starting express server in port ${port}`);
});