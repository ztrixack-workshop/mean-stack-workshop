var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
	mongoose.set('Debug', config.debug);
	var db = mongoose.connect(config.mongoUri);

	require('../app/model/user.model');

	return db;
}