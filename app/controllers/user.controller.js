var User = require('mongoose').model('user');
var passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) { // index error
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;

			default:
				message = 'Something went wrong';
		}
	} else {
		// validation error
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
}

exports.renderSignup = function(req, res) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign up',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
}

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		user.provider = 'local';

		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) {
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
}

exports.renderLogin = function(req, res) {
		if (!req.user) {
		res.render('login', {
			title: 'Log in',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
}

exports.login = 
//function(req, res) {
	// req.checkBody('email', 'Invalid email').notEmpty().isEmail();	
	// req.sanitizeBody('email').normalizeEmail();
	// var errors = req.validationErrors();
	// if (errors) {
	// 	res.render('index', {
	// 		title: 'There have been validation errors: ', // + JSON.stringify(errors),
	// 		isLoggedIn: false
	// 	});
	// 	return;
	// }

	// if (req.body.remember === 'remember') {
	// 	req.session.remember = true;
	// 	req.session.email = req.body.email;
	// 	req.session.cookie.maxAge = 60000;
	// }

	// res.render('index', {
	// 	title: 'Logged in as ' + req.body.email,
	// 	isLoggedIn: true
	// });
	
	
	passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		});
//}

exports.logout = function(req, res) {
	// req.session = null;

	// res.render('index', {
	// 	title: 'See you again later',
	// 	isLoggedIn: false
	// });
	
	req.logout();
	return res.redirect('/');
}

exports.create = function(req, res, next) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
}

exports.list = function(req, res, next) {
	// User.find({condition}, [Field], [Option], function(err, users){}); 
	User.find({}, function (err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
}

exports.read = function (req, res) {
	res.json(req.user);
}

exports.update = function(req, res, next) {
	User.findOneAndUpdate({username: req.user.username}, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
}

exports.delete = function(req, res, next) {
	req.user.remove(function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
}

exports.userByUsername = function(req, res, next, username) {
	User.findOne({username: username}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	})
}