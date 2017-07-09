var socket = io();

$(document).ready(function(){
  // Cache DOM
    var $form = $('#input-form'),
      $handle = $('#handle'),
      $message = $('#message'),  
      $output = $('#output')
  
  socket.on('connect', function(){
    console.log(socket.id + ' has connected');
  })
  // Emit events
  $form.on('submit', function(e){
    // Prevent form from submitting
    e.preventDefault();
    // Emit socket event
    socket.emit('chat', {
      handle: $handle.val(),
      message: $message.val()      
    });
    // Clear input text
    $message.val('');
  })

  // Listen for chat event and render to output
  socket.on('chat', function(data){
    $output.append(`<p>${data.handle}: ${data.message}</p>`)
  });
  

});