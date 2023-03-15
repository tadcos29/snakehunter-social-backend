const { connect, connection } = require('mongoose');

connect('mongodb://localhost/snakehunterDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
