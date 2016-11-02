var connect = require('connect');
var app = connect();

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
	res.setHeader('Content-Type', 'text/plain');
	res.end("Hello World!");
};

app.use(logger);
app.use(helloWorld);

app.listen(3000);
console.log('Server running at http://localhost:3000');