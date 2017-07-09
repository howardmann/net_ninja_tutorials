var Message = require('../db/message.js');

module.exports = function(done){
  let howie = Message.create({handle: 'Howie', message: 'Hi howie is joining' });
  let hela = Message.create({handle: 'Hela', message: 'Hi hela is the best' });
  let felix = Message.create({handle: 'Felix', message: 'DADADADADA' });
  Promise.all([howie, hela, felix]).
    then(() => done());
}
