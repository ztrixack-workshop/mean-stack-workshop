module.exports = function(app) {
	var user = require('../controllers/user.controller');
	app.post('/login', user.login);
	app.post('/logout', user.logout);

	app.route('/user')
		.post(user.create)
		.get(user.list);

	app.route('/user/:username') // URL param to var
		.get(user.read)
		.put(user.update);

	app.param('username', user.userByUsername); // for URL param convertion
};