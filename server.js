var express = require('./config/express');
var app = express();
app.listen(3000);

module.exports = app;

console.log('Server runnung at http://localhost:3000');