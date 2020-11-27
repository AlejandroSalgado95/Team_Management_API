var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const SessionModel = require('../models/session.model');


module.exports.saveAndroidPushToken = async (req, res, next) => {
  
  console.log('POST the android push token');

  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

      await SessionModel
        .findById(req.sessionDocId)
        .exec((err, session) =>{
          if (err) {
            console.log("Error finding session");
            res
              .status(500)
              .json(err);
            return;

          } 

          if (req.body.android_push_token)
              session.android_push_token = req.body.android_push_token;
            

          session
            .save((err, sessionUpdated) => {
              if(err) {
                res
                  .status(500)
                  .json(err);
              } else {
                console.log(sessionUpdated);
                res
                  .status(200)
                  .json({account: sessionUpdated.account});
              }
            });


        });


  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }

};