var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var Message = require('./db/message.js');
var socket = require('socket.io');

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(express.static('public'));

// Connect to mongodb
let db = require('./db/connection.js')
db.connect();

// Set bodyparser middleware
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render('index');
})

app.get('/messages', (req, res, next) => {
  Message.find({}).then(data => {
    res.json(data);
  })
})

app.post('/messages', (req, res, next) => {
  Message.create(req.body).then(data => {
    res.json(data);
  })
})

app.get('/chat', (req, res, next) => {
  Message.find({}).then(data => {
    res.render('chat', {messages: data, layout: 'chatLayout'});
  })
})

let server = app.listen(3000, () => console.log('Listening on port 3000'));

// Connect to socket.io
var io = socket(server);
var chatServer = require('./chatServer');
chatServer.connect(io);


module.exports = app;