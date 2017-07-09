var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  handle: String,
  message: String
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;