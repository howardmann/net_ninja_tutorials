var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema and model
var MarioCharsSchema = new Schema({
  name: String,
  weight: Number
});

var MarioChar = mongoose.model('mariochars', MarioCharsSchema);

module.exports = MarioChar;