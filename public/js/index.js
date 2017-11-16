var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message:', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (locationMessage) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${locationMessage.from}: `);
    a.attr('href', locationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(message) {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    locationButton.prop('disabled', true).text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.prop('disabled', false).text('Send location');
        if(!position){
            return;
        }
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (e) {
        alert('Unable to fetch location!');
        locationButton.prop('disabled', false).text('Send location');
    });
});