var express = require('express');
var app = express();

// req -> HTTP request object
// res -> HTTP response object
// next -> next middleware function
var logger = function(req, res, next) {
	// middleware
	console.log(req.method, req.url);

	next();
}

var helloWorld = function(req, res, next) {
	// middleware
	// res.setHeader('Content-Type', 'text/plain');
	// res.end("Hello World!");
	// express can convert Content-Type automatically by send method
	res.send("Hello World!");

};

var goodbyeWorld = function(req, res, next) {
	res.send("Hello World!");	
};

// mounting request path
app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', helloWorld);

app.listen(3000);
console.log('Server running at http://localhost:3000');

// for other
module.exports = app;