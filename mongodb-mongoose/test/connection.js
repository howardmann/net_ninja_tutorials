var mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Mocha befoe hook to run connection before other tests
before(function(done){
  // Connect to monbodb database
  mongoose.connect('mongodb://localhost/mariotest');
  mongoose.connection.once('open', function(){
    console.log('Connection has been made');
    done();
  }).on('error', function(error){
    console.log('Connection error', error);
  })
});
