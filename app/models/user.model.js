var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: {
		type: String, 
		unique: true, 
		trim: true,
		required: 'Username is required'
	},
	email: {
		type: String, 
		index: true,
		match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
	},
	password: {
		type: String,
		validate: [
		function(password) {
			return password && password.length >= 6;
		},
		'Password must br at least 6 characters'
		]
	},
	salt: { // password hash help to protect  the rainbow attackd 
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {
		// data from provider
	},
	created: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		enum: ['Admin', 'Owner', 'User'],
		default: 'User'
	}
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) callback(possibleUsername);
			else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
		} else {
			callback(null);
		}
	});
}

UserSchema.methods.hashPassword = function(password) { // Password-Based Key Derivative Function 2
	// ERROR crypto.pbkdf2 without specifying a digest is deprecated. Please specify a digest
	// return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64'); 
	return crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha1').toString('base64');
}

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
}

mongoose.model('user', UserSchema);