var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();

// Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
mongoose.connect('mongodb://howie:chicken@ds163181.mlab.com:63181/mlab-mongoose');

// Create schema for Student collection
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  name: String,
  age: Number
});

// Create new model/ collection within database based on schema created above
var Student = mongoose.model('Student', StudentSchema);
// new Student({name: 'jack', age: '21'}).save();

// // Not using a database, and only persist locally
// const data = [
//   {name: "joe", age: 21},
//   {name: "jill", age: 16},  
//   {name: "jack", age: 15}
// ]

// Set view engine
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

// Set bodyparser to parse post requests
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  // // Render lcoal data
  // res.render('index', {data});
  // Render mongodb MLAB data
  Student.find({}, function(err, data){
    if (err) throw err;
    res.render('index', {data});
  });


});

app.post('/data', (req, res) => {
  // // Persisting locally
  // var newData = {
  //   name: req.body.name,
  //   age: req.body.age
  // }

  // data.push(newData);

  // Persisting to MLAB MongoDB
  var newStudent = new Student({
    name: req.body.name,
    age: req.body.age
  });
  newStudent.save(function(err){
    if (err) throw err;
  });
  
  res.redirect('/');
});

// Listen
app.listen(3000, () => console.log('Listening on port 3000'));