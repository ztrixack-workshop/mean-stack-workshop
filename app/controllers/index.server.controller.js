exports.render = function(req, res) {
	/*var isLoggedIn = false;

	if (typeof req.session.remember !== 'undefined') {
		isLoggedIn = req.session.remember;
	}

	res.render('index', {
		title: 'Hello World',
		isLoggedIn: isLoggedIn
	});*/
	res.render('index', {
		title: 'Hello World',
		//username: req.user ? req.user.username : ""
		user: JSON.stringify(req.user)
	});
};