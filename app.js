require('dotenv').config();
require('./api/db/dbmongoose.js');
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var socketioJwt = require('socketio-jwt');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var mongoose = require('mongoose');
const MessageModel = require('./api/models/message.model');
const UserModel = require('./api/models/user.model');



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
// Notes: no unauthorized socket will be able to send messages, but any unauthorized socket will be able 
// to receive messages from other authenticated sockets during the 15 seconds said unauthorized
// socket is connected (the unauthorized socket is conencted during the 15 seconds gap it has to send
// his jwt and get authorized and have access to further events)
io.on('connection', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + socket.decoded_token.account);
    
    socket.on('sendMessage', async (message, callback) => {

        try {

            const loggedUser = await UserModel.findOne({account: socket.decoded_token.account});
           
           if (!loggedUser)
              throw "User not found";
            
            var createdMessage = await MessageModel.create({
              sendedBy : {
                name : loggedUser.name,
                senderID : loggedUser._id,
                account: loggedUser.account,
                role: loggedUser.role,
                user_type: loggedUser.user_type
              },
              content : message,
              createdOn : 12345
            });

            if (createdMessage){
              console.log(createdMessage);

              io.emit('message', {
                sendedBy : {
                  name : createdMessage.sendedBy.name,
                  senderID : createdMessage.sendedBy.senderID,
                  account: createdMessage.sendedBy.account,
                  role: createdMessage.sendedBy.role,
                  user_type: createdMessage.sendedBy.user_type
                },
                content : createdMessage.content,
                createdOn : createdMessage.createdOn
              });
              
              if (callback)
                callback();
             
            } else {

              throw "Message was not created";
            }

        } catch(e) {
            socket.emit("ErrorSendingMessage", {error : e});

        }

    })

  });


// Listen for requests
server.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('server started on port ' + port);
})

