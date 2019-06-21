const mongoose = require('mongoose');

mongoose.Promise = Promise; // Ask Mongoose to use standard Promises
mongoose.set('debug', true);  // Ask Mongoose to log DB request to console
mongoose.connect('mongodb://localhost/test'); // Connect to local database

module.exports = mongoose;