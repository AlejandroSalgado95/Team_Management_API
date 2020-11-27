require('dotenv').config();
var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
var bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const sessionModel = require('../models/session.model');


module.exports.login =  async (req, res) => {
  console.log('logging in user');
  console.log("Body content", req.body);
  var account = req.body.account;
  var password = req.body.password;

  if (account && password){
   
    UserModel.findOne({
      account: account
    }).exec(function(err, user) {

      console.log(user);

      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {

        if (user){
        
          if (bcrypt.compareSync(password, user.password)) {
            console.log('User found', user);
            
            crypto.randomBytes(128, function(err, buffer) {
            
              var session_id = buffer.toString('hex');

              console.log("session id: ", session_id);

              sessionModel.create({
                account: account,
                session_id: session_id
              }, function(err, createdSession) {

                if (createdSession){
                  res
                    .cookie('session-id',session_id, { maxAge:  15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'? true: false })
                    .status(200).json({success: true, session_id: session_id, userinfo: {_id: user._id, account: user.account, name: user.name, role: user.role, user_type: user.user_type} });
                
                } else 
                  res.status(200).json({success: false, message: 'invalid session id generated. internal server error'});
                  

              });

            });

          } else {
            res.status(401).json({success: false, message: 'Unauthorized'});
          }

        } else {

            res.status(404).json({ success: false, message : 'No user found'});

        }
        
      }
    });

  }  else  {
    
    res.status(401).json({ success: false, message : 'No credentials provided'});

  }

};




module.exports.logout =  async (req, res) => {
  

  sessionModel.findOneAndDelete({ _id: req.sessionDocId } , function (err, docs) { 
    
    if (err){ 

        console.log(err) 
        res
          .status(500)
          .json({success:false, message: 'It was not possible to log out from the session'});

    } else{ 

        console.log("logged out session doc id:", req.sessionDocId );
        res
          .cookie('session-id', null, { maxAge: 0 })
          .status(200)
          .json({success:true, message: 'Logged out successfully'});
        
    } 

  }); 


};





module.exports.authenticate = async (req, res, next) => {
  var authHeader = req.headers.authorization;
  var sessionCookie = req.cookies['session-id'];


  if (authHeader || sessionCookie) {
    
    var session_id = null;

    if(authHeader){
       session_id = authHeader.split(' ')[1]; //--> Authorization Bearer xxx
    }
    
    else if (sessionCookie){
      session_id = sessionCookie;
    }

    console.log("session id in request:",session_id);

    var existingSession = await sessionModel.findOne({
      session_id: session_id
    });

    if (existingSession){

      //refresh session id cookie expiracy to 15 days more from now
      res.cookie('session-id',session_id, { maxAge:  15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'? true: false }); 
      req.account = existingSession.account;
      req.sessionDocId = existingSession._id;
      existingSession.expireAt = Date.now(); //refresh session expiracy to 15 days more from now
      await existingSession.save();
      next();

    }

    else 
      res.status(403).json({success:false, message: 'The session does not exist'});

    
  } else {
    res.status(403).json({success:false, message: 'No session id provided'});
  }
};



