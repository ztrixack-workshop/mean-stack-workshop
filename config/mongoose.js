var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
	mongoose.set('Debug', config.debug);
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.mongoUri);

	require('../app/models/user.server.model');

	return db;
}