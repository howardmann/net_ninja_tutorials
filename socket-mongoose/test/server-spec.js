var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var cheerio = require('cheerio');
var mongoose = require('mongoose');
let server = require('../server.js');

describe('#server', function(){
  beforeEach(done => {
    let seedDatabase = require('../db/seed');
    seedDatabase(done);
  });

  afterEach(done => {
    mongoose.connection.collections.messages.drop(() => done());
  });
  
  it('should exist', () => expect(server).to.be.ok);

  it('should return home page on GET /', function(done){
    chai.request(server)
      .get('/')
      .end(function(err, res){
        let $ = cheerio.load(res.text);
        let h1 = $('h1').text();
        expect(res).to.have.status(200);
        expect(h1).to.equal('Socket chat')
        done();
      })
  });
  
  describe('messages', function(){
    it('should get all messages on GET /messages', function(done){
      chai.request(server)
        .get('/messages')
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body.length).to.equal(3);
          expect(res.body[0]).to.have.property('handle');
          expect(res.body[0].handle).to.equal('Howie');
          done();
        });
    });

    it('should create a message on POST /messages', function(done){
      chai.request(server)
        .post('/messages')
        .send({
          handle: 'Cat',
          message: "Miaow"
        })
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(res).to.be.a('object');          
          expect(res.body.handle).to.equal('Cat');
          done();
        })
    })
  });

  describe('chat', function(){
    it('should load display all chat messages in #output', function(done){
      chai.request(server)
        .get('/chat')
        .end(function(err, res){
          let $ = cheerio.load(res.text);
          let $output = $('#output');
          expect(res.status).to.equal(200);
          expect($output.text()).to.include('Howie');
          done();
        })
    })
  })
});