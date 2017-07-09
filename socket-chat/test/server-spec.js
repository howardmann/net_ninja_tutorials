var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var cheerio = require('cheerio');
var sinon = require('sinon');
chai.use(chaiHttp);

let server = require('../server');

describe('#server', function(){
  it('should load chat app html page on GET /', function(done){
    chai.request(server)
      .get('/')
      .end(function(err,res){
        let $ = cheerio.load(res.text);
        let h1 = $('h1').text();
        expect(h1).to.equal('socket.io chat app')
        done();
      });
  })
});

describe('#socket', function(){
  // Require socket io dependencies
  var io = require('socket.io-client');
  var socketUrl = 'http://localhost:3000';
  // Optional argument for socket.io options
  var options ={
    transports: ['websocket'],
    'force new connection': true
  };  

  var sender;
  var receiver;

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
      handle: 'Howie burger'
    }

    sender.emit('chat', msg);
    receiver.on('chat', function(data){
      expect(data).to.eql(msg);
      done();
    })
  });  

  it('should emit typing messages from sender to receiver', function(done){
    let msg = 'Is typing'

    sender.emit('typing', msg);
    receiver.on('typing', function(data){
      expect(data).to.eql(msg);
      done();
    })
  }); 

  it('should add a newUser with socket.id', function(done){
    let user = 'mary';
    sender.emit('newUser', user);
    sender.on('newUser', function(data){
      let senderId = server.users[user]
      expect(senderId).to.equal(sender.id);
      done();
    })
  });

  it('should send a pm to user', function(done){
    let user = 'mary';
    receiver.emit('newUser', user);
    let msg = {
      to: user,
      message: 'mary i love u'
    }
    sender.emit('pm', msg);
    receiver.on('pm', function(data){
      expect(data).to.eql(msg);
      done();
    });
  });

  it('Using socket-tester  should emit typing message from sender to receiver', function(done){
    // Example using socket-tester npm module
    var SocketTester = require('socket-tester');
    var socketTester = new SocketTester(io, socketUrl, options);

    var client1 = {
      on: {
        'typing': socketTester.shouldBeCalledWith('test')
      }
    };
 
    var client2 = {
      emit: {
        'typing': 'test'
      }
    };
 
    socketTester.run([client1, client2], done);
  });

  it('Using socket-tester should send pm from sender to receiver and not third parties', function(done){
    // Example using socket-tester npm module
    var SocketTester = require('socket-tester');
    var socketTester = new SocketTester(io, socketUrl, options);
    let user = 'mary';
    let msg = {
      to: user,
      message: 'Mary I love u'
    }
    var client1 = {
      on: {
        'pm': socketTester.shouldBeCalledWith(msg)
      },
      emit: {
        'newUser': user
      }
    };
 
    var client2 = {
      emit: {
        'pm': msg
      }
    };

    var client3 = {
      on: {
        'pm': socketTester.shouldNotBeCalled()
      }
    };    
 
    socketTester.run([client1, client2, client3], done);
  });

});


