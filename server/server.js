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
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    })
});


app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Starting express server in port ${port}`);
});