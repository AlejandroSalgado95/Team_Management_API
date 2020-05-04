require('dotenv').config();
var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');




module.exports.getAllUsers = async (req, res) => {

  console.log('GET the users');

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see other user's info
  if (loggedUser){

    await UserModel
      .find({})
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
                .json(user);
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
                res
                  .status(204)
                  .json(userUpdated);
              }
            });


        });


  } else {
    
        res.status(404).json({ "message" : 'No authorized user found'});
  }

};


module.exports.deleteOneUser = async (req, res) => {
  var userId = req.params.userId;

  const userToDelete = await UserModel.findById(userId);
  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

    //an admin can delete either an user or another admin
    //a user can only delete itself
    if (loggedUser.user_type === "admin" || userToDelete.account === loggedUser.account){

     
      await UserModel
        .findByIdAndRemove(userId)
        .exec(function(err, user) {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            console.log("User deleted, id:", userId);
            res
              .status(204)
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



module.exports.login =  async (req, res) => {
  console.log('logging in user');
  var account = req.body.account;
  var password = req.body.password;

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
          var token = jwt.sign({ account: user.account }, process.env.JWT_SECRET, { expiresIn: 3600 });
          res.status(200).json({success: true, token: token});
        } else {
          res.status(401).json('Unauthorized');
        }

      } else {

          res.status(404).json({ "message" : 'No user found'});

      }
      
    }
  });
};



module.exports.authenticate = async (req, res, next) => {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.account = decoded.account;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};












