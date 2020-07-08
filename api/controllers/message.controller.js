var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const MessageModel = require('../models/message.model');




module.exports.getSomeMessages = async (req, res) => {

  console.log('GET some messages');

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see all existing tasks
  if (loggedUser){

    var messages = null; 

    if (req.query.last_message_id){

      console.log("RECEIVED QUERY PARAMS", req.query.last_message_id);
    	
      var lastMessageID = req.query.last_message_id;

      messages = await MessageModel.find({ _id: { $lt: lastMessageID} }).sort('-date').limit(10);


    } else {

      console.log("DID NOT RECEIVE QUERY PARAMS");

      messages = await MessageModel.find({}).sort('-date').limit(10);

    }

    if (messages){

      res
        .status(200)
        .json(messages);

    } else {

      res
        .status(500)
        .json({"message": "No messages found" });


    }
  
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
      date : Date.now()
  });

  if (createdMessage)
  	return createdMessage;
  else 
  	return;
};

