var mongoose = require('mongoose');
// Use ES6 Promises for mongoose due to deprecation
mongoose.Promise = global.Promise;

// Use mongoose to connect to locahost
mongoose.connect('mongodb://localhost/mongo-localhost-book');
mongoose.connection.once('open', function(){
  console.log('Connection has been made');
}).on('error', function(error){
  console.log('Connection error', error);
})

// Create Book schema
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  pages: Number,
  price: {
    type: Number,
    default: 15.21
  }
})
// Create new Book collection referencing Schema
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;