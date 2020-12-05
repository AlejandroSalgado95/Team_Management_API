var mongoose = require('mongoose');
const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');
var helpers = require('../helpers/helpers');
const SessionModel = require('../models/session.model');




module.exports.addOneComment = async (req, res) => {
  
  console.log("POST new comment");

  var id = req.params.taskId;

    
  const loggedUser = await UserModel.findOne({account:req.account});
  const task = await TaskModel.findById(id).populate('assignedToUser');

  console.log("Populated task", task);


  if (loggedUser && task && (loggedUser.user_type == "admin" || task.assignedToUser._id.equals(loggedUser._id))){

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

          var commentIndex = taskUpdated.taskComments.length - 1;

          if (taskUpdated.assignedToUser != null){
              SessionModel
                .find({account: taskUpdated.assignedToUser.account})
                .exec( (err, sessions) => {
                  if (err) {
                    console.log("Error finding sessions");
                  } else {
                    console.log("Found sessions", sessions.length);
                          
                    sessions.map(someSession => {

                      if (someSession.android_push_token){
                               
                        helpers.sendAndroidPushNotification (someSession.android_push_token, 
                        {title: "New comment received!", body: taskUpdated.taskComments[commentIndex].content}, 
                        {taskID: taskUpdated._id}, "new_comment");

                      }

                    })

                  }
                });
            }



          res
            .status(200)
            .json(taskUpdated.taskComments[commentIndex]);
      }
    });

      

  } else {
        
        if (!loggedUser || (loggedUser.user_type != "admin" && loggedUser._id == task.assignedToUser ))
          res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized

        else if (!task)
          res.status(404).json({ "message" : 'No task found'}); //Not found

    
  }


};










