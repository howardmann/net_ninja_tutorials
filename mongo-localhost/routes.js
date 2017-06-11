var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Require MODEL
var Book = require('./model');

// RESTful routes for books
router.get('/books', function(req, res, next){
  Book.find({})
    .then(books => res.send(books))
    .catch(next);
});

router.post('/books', function(req, res, next){
  Book.create(req.body)
    .then(book => res.send(book))
    .catch(next);
});

router.get('/books/:id', function(req, res, next){
  Book.findById(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});

router.put('/books/:id', function(req, res, next){
  Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(book => res.send(book))
    .catch(next);
});

router.delete('/books/:id', function(req, res, next){
  Book.findByIdAndRemove(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});


module.exports = router;