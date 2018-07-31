var socket = io(); // create connection
socket.on('connect', function ()  {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@com',
  //   text: 'hey its keno'
  // });

  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup, that works for me.'
  });

});
socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// socket.on('newEmail', function (email) {
//   console.log('new email', email);
// });
