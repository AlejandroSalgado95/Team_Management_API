require('dotenv').config();
require('./api/db/dbmongoose.js');
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var mongoose = require('mongoose');
var helpers = require('./api/helpers/helpers');
const cookieParser = require('cookie-parser');
const SessionModel = require('./api/models/session.model');



var routes = require('./api/routes/routes');
var port = process.env.PORT || process.env.MY_PORT;
var server = http.createServer(app);
var io = socketio(server); 

// Define the port to run on
app.set('port', port);

//secure attributed cookies requires HTTPS. if the Node app is behind a proxy (like Nginx), we will have to set proxy to true
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); 
}

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

//parse client cookies from incoming http requests
app.use(cookieParser());

// Add some routing
app.use('/api', routes);


/*
io.on('connection', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + socket.decoded_token.account);
    
    socket.on('sendMessage', async (message, callback) => {

        try {

            var sender = socket.decoded_token.account;
            createdMessage = await helpers.addOneMessage(message,sender);

            if (createdMessage){
              console.log(createdMessage);

              io.emit('message', {
                sendedBy : {
                  name : createdMessage.sendedBy.name,
                  _id : createdMessage.sendedBy._id,
                  account: createdMessage.sendedBy.account,
                  role: createdMessage.sendedBy.role,
                  user_type: createdMessage.sendedBy.user_type
                },
                content : createdMessage.content,
                date : createdMessage.date
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

  });*/
  
/*
io.use(function(socket, next) {
  var handshakeData = socket.request;

  var data = handshakeData._query['auth_token'];
});
*/

io.on('connect', async socket => {

    console.log("SOCKET SESSION ID:", socket.request._query['session_id']);
    socketSessionId = socket.request._query['session_id'];

     await SessionModel
        .find({session_id: socketSessionId} )
        .exec( (err, session) =>{
          if (err) {
            console.log("Socket is not authenticated");
            socket.disconnect();


          } else{

              if (session){
                console.log("SOCKET IS AUTHENTICATED");
                socket.session_id = socketSessionId;
                socket.session_account = session[0].account;
              }

          }


      });


      socket.on('sendMessage', async function (dataReceived, callback) {
                
                console.log(dataReceived);

                if (!dataReceived.session_id){
                    console.log("NO SENDER FOUND IN MESSAGE");
                    socket.disconnect();
                } else{

                  sessionRetrieved = await SessionModel.find({session_id: dataReceived.session_id} );
                  
                  if (sessionRetrieved[0].account){
                    try {
                        console.log("MESSAGE RECEIVED FROM SESSION:", sessionRetrieved[0].session_id);
                        var sender = sessionRetrieved[0].account;
                        createdMessage = await helpers.addOneMessage(dataReceived.message,sender);

                        if (createdMessage){
                          console.log(createdMessage);

                          io.emit('message', {
                            sendedBy : {
                              name : createdMessage.sendedBy.name,
                              _id : createdMessage.sendedBy._id,
                              account: createdMessage.sendedBy.account,
                              role: createdMessage.sendedBy.role,
                              user_type: createdMessage.sendedBy.user_type
                            },
                            content : createdMessage.content,
                            date : createdMessage.date
                          });
                          
                          if (callback)
                            callback();
                         
                        } else {

                          throw "Failed to deliver message";
                        }

                    } catch(e) {
                        socket.emit("ErrorSendingMessage", {success: false, message: e});

                    }
                  } else {

                    console.log("Socket sender is not valid");
                    console.log(sessionRetrieved);
                    socket.disconnect();

                  }

                }
                  

      })





});



// Listen for requests
server.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('server started on port ' + port);
})

