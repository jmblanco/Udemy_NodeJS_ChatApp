var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'JMBG',
    //     text: 'Hi from computer!!!'
    // });
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('welcomeMessage', function (message) {
    console.log(message);
});

socket.on('newUserConnected', function (message) {
    console.log(message);
});

socket.on('newMessage', function (message) {
    console.log('New message incoming;', message);
});
