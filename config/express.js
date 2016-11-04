var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var session = require('express-session');
var config = require('./config');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === "development") {
		app.use(morgan('dev'));
	} else {
		app.use(compression);
	}
	app.use(session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true
	}));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(validator()); // next from bodyParser

	app.set('views', './app/views');
	app.set('view engine', 'jade');

	require('../app/routes/index.routes')(app);
	require('../app/routes/user.routes')(app);// runtime must be below route for high perfomance
	// before express.static
	if (process.env.NODE_ENV === "development") {
		app.use(sass({
			src: './sass',
			dest: './public/css',
			outputStyle: 'compact', // compressed, compact, expandded
			prefix: '/css',
			indentedSyntax: true,
			debug: true
		}));
	} else {
		app.use(sass({
			src: './sass',
			dest: './public/css',
			outputStyle: 'compressed',
			indentedSyntax: true,
			prefix: '/css'
		}));
	}

	app.use(express.static('./public'));

	return app;
}