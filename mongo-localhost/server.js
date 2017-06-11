var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Set middleware
app.use(bodyParser.json());

// Require routes
app.use(require('./routes.js'));

// Catch errors
app.use(function(err, req, res, next){
  if (err) {
    res.status(422).send({
      error: err.message
    });
  } else {
    next();
  }
});

// Catch 404
app.use(function(req, res){
  res.status(404).send({error: '404 error'})
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})