var Message = require('./db/message.js');

module.exports.connect = function(io){
  io.on('connection', function(socket){
    console.log('connection made');
    // Handle chat event - Follows pub sub pattern
    // Listens for 'chat' event being submitted on client side  - it will look like socket.emit('chat', data)
    socket.on('chat', function(data){
      Message.create(data);
      io.sockets.emit('chat', data);
    });
  });
}
