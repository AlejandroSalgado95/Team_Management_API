var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const MessageModel = require('./api/models/message.model');




module.exports.getSomeMessages = async (req, res) => {

  console.log('GET some messages');

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see all existing tasks
  if (loggedUser){

  	var lastMessageID = req.query.last_message_id;

    MessageModel
      .find({ _id: { $gt: lastMessageID} })
      .limit(10);
      .exec( (err, messages) => {
        if (err) {
          console.log("Error finding messages");
          res
            .status(500) //Internal server error
            .json(err);
        } else {
          console.log("Found messages", messages.length);
          res
            .status(200) //ok
            .json(messages);
        }
      });

  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized
  }
   
};



//This method is not called through a HTTP request, nor being routed. This method is being used
//within the socket.io protocol
module.exports.addOneMessage = async (message, sender) => {
  console.log("POST new message");

  const loggedUser = await UserModel.findOne({account: sender});
           
  if (!loggedUser)
      return ;
            
  var createdMessage = await MessageModel.create({
      sendedBy : {
         name : loggedUser.name,
         _id : loggedUser._id,
         account: loggedUser.account,
         role: loggedUser.role,
         user_type: loggedUser.user_type
      },
      content : message,
      createdOn : 12345
  });

  if (createdMessage)
  	return createdMessage;
  else 
  	return;
};

