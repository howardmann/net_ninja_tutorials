var chai = require('chai');
var expect = chai.expect;
var io = require('socket.io-client');
var socketUrl = 'http://localhost:3000';
var options = {
  transports: ['websocket'],
  'force new connection': true
};  

var sender;
var receiver;

describe('#socket', function(){
  beforeEach(function(done){
    // Connect as if connecting via chrome browser
    sender = io.connect(socketUrl, options);
    receiver = io.connect(socketUrl, options);
    done();
  });

  afterEach(function(done){
    // Disconnect after each test
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  it('should emit chat messages from sender to receiver', function(done){
    let msg = {
      message: 'Hello world',
      handle: 'Howie'
    }

    sender.emit('chat', msg);
    receiver.on('chat', function(data){
      expect(data).to.eql(msg);
      done();
    })
  });  

});


