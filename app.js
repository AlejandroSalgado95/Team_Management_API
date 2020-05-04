require('dotenv').config();
require('./api/db/dbmongoose.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes/routes');

// Define the port to run on
app.set('port', process.env.MY_PORT);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('server started on port ' + port);
});
