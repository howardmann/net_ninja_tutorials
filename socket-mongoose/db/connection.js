var mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Set environment variables
var config  = process.env.NODE_ENV || 'development';

exports.connect = function(){
  if (config === 'development' ) {
    mongoose.connect('mongodb://localhost:27017/mongo-socket');
  } else if (config === 'test') {
    mongoose.connect('mongodb://localhost:27017/mongo-socket-test', {useMongoClient: true});
  } else {
    // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
    const username = process.env.MONGO_USER;
    const password = process.env.MONGO_PW;
    mongoose.connect(`mongodb://${username}:${password}@ds153352.mlab.com:53352/socket-mongoose`);    
  }

  // Signal connection
  mongoose.connection.once('open', function(){
    console.log('Connection has been made');
  }).on('error', function(error){
    console.log('Connect error', error);
  })
};
