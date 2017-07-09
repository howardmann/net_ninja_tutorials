var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Socket io setup and listen for connection
// var io = socket(server);

// Syntax docs
// Connect to a socket
// io.on('connection', function(socket){...});
// Listen to an event
// socket.on('eventName', function(data){...});
// Emit event back to the socket that listened
// socket.emit('eventName', data)
// Emit event back to all sockets listening
// io.sockets.emit('eventName, data)
// Broadcast emit back to all sockets except for the one that sent it
// socket.broadcast.emit('eventName', data)
app.users = [];

// Connects to web socket via port defined above
io.on('connection', function(socket){
  // Notify connection made (check node server logs)
  socket.on('newUser', function(user){
    app.users[user] = socket.id;
    io.sockets.emit('newUser', {user: user, id: socket.id});
  })
  // Handle chat event - Follows pub sub pattern
  // Listens for 'chat' event being submitted on client side  - it will look like socket.emit('chat', data)
  socket.on('chat', function(data){
    // Emits the same data back to the client side to all sockets listening
    // If we use socket.broadcast.emit it will emit the message to all other sockets listening except the one that sent it
    // We use io.sockets.emit to emit it back to all sockets listening
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

  // Handle private messages
  socket.on('pm', function(data){
    let id = app.users[data.to];
    socket.to(id).emit('pm', data);
  })
});

app.use(express.static('public'));

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/public/index.html')
});

http.listen('3000', function(){
  console.log('Listening to port 3000');
});

module.exports = app;