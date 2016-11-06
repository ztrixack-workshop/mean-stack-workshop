var user = require('../controllers/user.controller');

module.exports = function(app) {
	app.route('/signup')
		.get(user.renderSignup)
		.post(user.signup);

	app.post('/login', user.login);
	app.post('/logout', user.logout);

	app.route('/user')
		.post(user.create)
		.get(user.list);

	app.route('/user/:username') // URL param to var
		.get(user.read)
		.put(user.update)
		.delete(user.delete);

	app.param('username', user.userByUsername); // for URL param convertion
};