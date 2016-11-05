var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: {
		type: String, 
		unique: true, 
		trim: true,
		required: true
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

mongoose.model('user', UserSchema);