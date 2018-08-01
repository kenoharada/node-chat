const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMesssage} = require('./utils/message')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log('new user connected');
  // socket.emit('newEmail', {
  //   from: 'mike@com',
  //   text: 'hey',
  //   createdAt: 123
  // });

  socket.emit('newMessage', generateMesssage('admin','welcome to the chat app'));

  // socket.broadcast.emit from Admin text New message
  socket.broadcast.emit('newMessage', generateMesssage('admin','New user joined'));


  // socket.emit('newMessage', {
  //   from: 'John',
  //   text: 'see you then',
  //   createdAt: 123123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage', generateMesssage(message.from,message.text));
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
});


// console.log(__dirname + '/../public');
//
// console.log(publicPath);
