var mongoose = require('mongoose');
const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');
var helpers = require('../helpers/helpers');




module.exports.addOneComment = async (req, res) => {
  
  console.log("POST new comment");

  var id = req.params.taskId;

    
  const loggedUser = await UserModel.findOne({account:req.account});
  const task = await TaskModel.findById(id);


  if (loggedUser && task && (loggedUser.user_type == "admin" || loggedUser._id == task.assignedToUser)){

    task.taskComments.push({
      postedBy : {
        name : loggedUser.name,
        userID : loggedUser._id
      },
      content : req.body.content,
      createdOn : req.body.createdOn
    });

    task.save(function(err, taskUpdated) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(taskUpdated.taskComments[taskUpdated.taskComments.length - 1]);
      }
    });

      

  } else {
        
        if (!loggedUser || (loggedUser.user_type != "admin" && loggedUser._id == task.assignedToUser ))
          res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized

        else if (!task)
          res.status(404).json({ "message" : 'No task found'}); //Not found

    
  }


};










