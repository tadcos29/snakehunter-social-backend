const { connect, connection } = require('mongoose');

connect('mongodb://localhost/minipStud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
