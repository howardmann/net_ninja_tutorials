$(document).ready(function(){
  // Ajax promises in action to avoid callback hell
  $.get('/data/names.json')
    .then(function(result){
      console.log(result);
      return $.get('/data/colors.json')
    })
    .then(function(result){
      console.log(result);
      return $.get('/data/movies.json')      
    })
    .then(function(result){
      console.log(result);      
    })
    .catch(function(err){
      console.log("error", err);
    });

  // Make our own promise using ES6 promises
  var delayPromise = seconds => {
    // Construct a new promise that resolves and rejects
    return new Promise((resolve, reject) => {
      // Reject
      if (seconds < 1) { return reject('Error: Cannt be less than 1 second') }

      // Resolve
      window.setTimeout(() => {
        console.log(`Delay after ${seconds} seconds`);
        resolve('Result: Happy message');
      }, seconds * 1000);
    });
  };

  // Resolve to be a successful promise
  delayPromise(2)
    .then( result => console.log(result))
    .catch( err => console.log(err));

  // Reject and catch error (this executes immediately without having to wait for above promises to complete)
  delayPromise(0.1)
    .then( result => console.log(result))
    .catch( err => console.log(err));
  
});