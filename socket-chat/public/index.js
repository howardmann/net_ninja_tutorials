// Make connection - if not passing in url it will default connect to the server that served it
var socket = io();
// var socket = io.connect('http://localhost:3000');

$(document).ready(function(){
  // Cache DOM
  var $form = $('#input-form'),
      $handle = $('#handle'),
      $message = $('#message'),  
      $output = $('#output'),
      $feedback = $('#feedback')

  // Emit events
  $form.on('submit', function(e){
    // Prevent form from submitting
    e.preventDefault();
    // Emit socket event
    socket.emit('chat', {
      message: $message.val(),
      handle: $handle.val()
    });
    // Clear input text
    $message.val('');
  })

  $message.on('keypress', function(){
    socket.emit('typing', $handle.val());
  });

  // Listen for chat event and render to output
  socket.on('chat', function(data){
    $feedback.html('');
    $output.append(`<p>${data.handle}: ${data.message}</p>`)
  });

  var typing = false;
  var timeoutFunction = function(){
    typing = false;
    $feedback.html('');
  }

  // Listen for typing event and render to feedback
  socket.on('typing', function(data){
    let timeout;
    if(typing === false){
      typing = true;
      $feedback.html(`<p>${data} is typing`);
      timeout = setTimeout(timeoutFunction, 2000);
    } else {
      clearTimeout(timeout);
    }
  });

  // Listen for new user added
  socket.on('newUser', function(data){
    console.log(data);
  })

  // Listen for private message and alert
  socket.on('pm', function(data){
    console.log(data.message);
  })
});
