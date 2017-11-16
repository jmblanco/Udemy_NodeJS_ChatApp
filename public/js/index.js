var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,        
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (locationMessage) {
    var template = jQuery('#location-message-template').html();
    
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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