require('dotenv').config();
require('./api/db/dbmongoose.js');
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var socketioJwt = require('socketio-jwt');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

var routes = require('./api/routes/routes');
var port = process.env.PORT || process.env.MY_PORT;
var server = http.createServer(app);
var io = socketio(server); 

// Define the port to run on
app.set('port', port);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Add some routing
app.use('/api', routes);


// Socket.io authentication 
io.on('connection', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + socket.decoded_token.account);
    
    socket.on('sendMessage', (message, callback) => {

        io.emit('message', {text : message})
        callback();
    })

  });


// Listen for requests
server.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('server started on port ' + port);
})

