var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const SessionModel = require('../models/session.model');
const TaskModel = require('../models/task.model');
var bcrypt = require('bcrypt');




module.exports.getAllUsers = async (req, res) => {

  console.log('GET the users');


  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see other user's info
  if (loggedUser){

    await UserModel
      .find({})
      .select('-password -android_push_token')
      .exec( (err, users) => {
        if (err) {
          console.log("Error finding users");
          res
            .status(500)
            .json(err);
        } else {
          console.log("Found users", users.length);
          res
            .json(users);
        }
      });

  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }
   
};



module.exports.register = async (req, res) => {
  console.log("POST new user");

    
  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

    console.log(loggedUser);

    //only an admin can register more accounts, be it as users or admins
    if (loggedUser.user_type === "admin"){

        await UserModel
          .create({
            account:req.body.account,
            password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            name:req.body.name,
            role:req.body.role,
            user_type:req.body.user_type
          }, function(err, user) {
            if (err) {
              console.log("Error creating user");
              res
                .status(400)
                .json(err);
            } else {
              console.log("User created!", user);
              res
                .status(201)
                .json({_id: user._id, account: user.account, name: user.name, role: user.role, user_type: user.user_type});
            }
          });

    } else{
       
        res.status(401).json({ "message" : 'Unauthorized user'});

    }

  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }


};


module.exports.getOneUser = async (req, res) => {
  var id = req.params.userId;

  console.log('GET userId', id);

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see other user's info
  if (loggedUser){

    await UserModel
      .findById(id)
      .select('-password -android_push_token')
      .exec(function(err, doc) {
        var response = {
          status : 200,
          message : doc
        };
        if (err) {
          console.log("Error finding user");
          response.status = 500;
          response.message = err;
        } else if(!doc) {
          console.log("userId not found in database", id);
          response.status = 404;
          response.message = {
            "message" : "userId ID not found " + id
          };
        }
        res
          .status(response.status)
          .json(response.message);
      });

  } else {

      res.status(404).json({ "message" : 'No authorized user found'});

  }

};



module.exports.updateOneUser = async (req, res) => {
  var userId = req.params.userId;

  console.log('PUT userId', userId);

  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

      await UserModel
        .findById(userId)
        .exec((err, user) =>{
          if (err) {
            console.log("Error finding user");
            res
              .status(500)
              .json(err);
            return;

          } else if(!user) {
            console.log("userId not found in database", userId);
            res
              .status(404)
              .json({
                "message" : "User ID not found " + userId
              });
            return;

            //You wont be able to update an account unless you are an admin or you are trying to update your own account (be it a user or admin account)
          } else if (loggedUser.user_type != "admin" && user.account != loggedUser.account){

            res
              .status(401)
              .json({ 
                "message" : 'Unauthorized user'
              });
            return; 

          }

          //if an admin wants to update someone else (be it a user or an admin), it will only
          // be able to update its role and/or user type 
          if ( user.account != loggedUser.account){

            if (req.body.role)
              user.role = req.body.role;
            
            if (req.body.user_type)
              user.user_type = req.body.user_type;

            //if a user wants to update itself, it will only be able to update its name and/or password
            //but if an admin wants to update itself, it will also be able to update its role
          } else if (user.account === loggedUser.account){


            if (loggedUser.user_type == "admin")
              if (req.body.role)
                user.role = req.body.role;

            if (req.body.name)
              user.name = req.body.name;

            if (req.body.password)
              user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));



          }

          user
            .save((err, userUpdated) => {
              if(err) {
                res
                  .status(500)
                  .json(err);
              } else {
                console.log(userUpdated);
                res
                  .status(200)
                  .json({_id: userUpdated._id, account: userUpdated.account, name: userUpdated.name, role: userUpdated.role, user_type: userUpdated.user_type});
              }
            });


        });


  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }

};


module.exports.deleteOneUser = async (req, res) => {

  const userToDelete = await UserModel.findById(req.params.userId);
  const loggedUser = await UserModel.findOne({account:req.account});

  var userToDeleteAccount = userToDelete.account;
  console.log("logged in account:", loggedUser.account);

  if (loggedUser){

    //an admin can delete either an user or another admin
    //a user can only delete itself
    if (loggedUser.user_type === "admin" || userToDeleteAccount === loggedUser.account){


        if (userToDeleteAccount === loggedUser.account){
            res.cookie('session-id', null, { maxAge: 0 }); 
            //res.cookies['session-id'].expires = Date.now();

        }


        UserModel
              .findByIdAndRemove(req.params.userId)
              .exec(async (err, user) => {
                if (err) {
                  res
                    .status(500)
                    .json(err);
                } else {

                  await SessionModel.deleteMany({ account: userToDeleteAccount });
                  await TaskModel.find({$or:[{createdByUser: req.params.userId},{assignedToUser:req.params.userId}]}, function(err, tasks) 
                   {
                        tasks.map(async someTask => {

                            if (someTask.createdByUser == req.params.userId){
                                someTask.createdByUser = null;
                            
                            } else if (someTask.assignedToUser == req.params.userId){
                                someTask.assignedToUser = null;

                            }
                            
                            someTask.save();
                        
                        })

                      
                   });

                  console.log("User deleted:", userToDeleteAccount);
                  res
                    .status(200)
                    .json();        

                }
                
        });

      

    } else {

          res.status(401).json({ "message" : 'Unauthorized user'});
    }

  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }


};













