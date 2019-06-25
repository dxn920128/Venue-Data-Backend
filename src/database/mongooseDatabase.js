const mongoose = require('mongoose');

mongoose.Promise = Promise; // Ask Mongoose to use standard Promises
mongoose.set('debug', true);  // Ask Mongoose to log DB request to console
mongoose.connect('mongodb://venue-data-user:rM42hwr!FoKgqAXh@ds343217.mlab.com:43217/venue-data-dev'); // Connect to local database

module.exports = mongoose;