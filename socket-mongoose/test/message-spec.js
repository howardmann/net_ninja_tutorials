var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var Message = require('../db/message.js');
var mongoose = require('mongoose');

describe('#Message', function(){
  beforeEach(done => {
    let seedDatabase = require('../db/seed');
    seedDatabase(done);
  });  

  afterEach(done => {
    mongoose.connection.collections.messages.drop(() => done());
  });

  it('should exist', () => expect(Message).to.be.ok);

  describe('.create', () => {
    it('should create a new message', (done)=>{
      let msg = {
        handle: 'Joe',
        message: 'This is my first joe message'
      }
      Message.create(msg).then((data)=>{
        expect(data.handle).to.equal(msg.handle);
        done();
      });
    });
  });

  describe('.find', () => {
    it('.find({}) should find all messages ', (done) => {
      Message.find({}).then(data => {
        let input = data.length;
        let actual = 3
        expect(input).to.equal(actual)
        done();
      })
    })

    it(".find({handle: 'Howie'})", (done) => {
      Message.findOne({'handle': 'Howie'}).then(data => {
        let input = data.handle;
        let actual = 'Howie';
        expect(input).to.equal(actual);
        done();
      })
    })
  });
});


