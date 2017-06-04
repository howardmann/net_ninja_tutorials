var assert = require('assert');
var MarioChar = require('../models/mariochars');

// Describe tests
describe('Saving records', function(){
  // Ceate test
  it('Saves a record to the database', function(done){
    var char = new MarioChar({
      name: 'Mario'
    });

    char.save().then(function(){
      assert(!char.isNew);
      done();
    });
  });
});