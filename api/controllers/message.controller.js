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

      console.log("RECEIVED QUERY PARAMS", req.query);
    	
      var lastMessageID = req.query.last_message_id;

      messages = await MessageModel.find({ _id: { $lt: lastMessageID} }).sort('-date').limit(10);


    } else {

      console.log("DID NOT RECEIVE QUERY PARAMS", req.query);

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


