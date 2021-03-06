var mongoose = require('mongoose');
const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');
var helpers = require('../helpers/helpers');
const SessionModel = require('../models/session.model');





module.exports.getAllTasks = async (req, res) => {

  console.log('GET the tasks');

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see all existing tasks
  if (loggedUser){

    await TaskModel
      .find({})
      .select('-taskComments')
      .populate("createdByUser", "-password -android_push_token")
      .populate("assignedToUser", "-password -android_push_token")
      .exec( (err, tasks) => {
        if (err) {
          console.log("Error finding tasks");
          res
            .status(500) //Internal server error
            .json(err);
        } else {
          console.log("Found tasks", tasks.length);
          res
            .status(200) //ok
            .json(tasks);
        }
      });

  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized
  }
   
};

module.exports.getTasksFromUser = async (req, res) => {

  var userId = req.params.userId;

  console.log('GET the tasks from user ' + userId);

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see all existing tasks
  if (loggedUser){

    await TaskModel
      .find({assignedToUser: userId})
      .select('-taskComments')
      .populate("createdByUser", "-password -android_push_token")
      .populate("assignedToUser", "-password -android_push_token")
      .exec( (err, tasks) => {
        if (err) {
          console.log("Error finding tasks");
          res
            .status(500) //Internal server error
            .json(err);
        } else {
          console.log("Found tasks", tasks.length);
          res
            .status(200) //OK
            .json(tasks);
        }
      });

  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized
  }


}



module.exports.addOneTask = async (req, res) => {
  console.log("POST new task");

    
  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

    console.log(loggedUser);

    //only an admin can create more tasks
    if (loggedUser.user_type === "admin"){

        TaskModel
          .create({
            
            name: req.body.name,
            description: req.body.description,
            createdByUser: loggedUser._id,
            creationDate: Date.now(),
            dueDate: req.body.dueDate,
            assignedToUser: req.body.assignedToUser,
            status: false

          }, async (err, task) => {

            if (err) {
              console.log("Error creating task");
              res
                .status(400) //Bad request
                .json(err);
            } else {

              console.log("Task created!", task);
              

              if (!loggedUser._id.equals(task.assignedToUser)){

                var populatedTask = await TaskModel.findById(task._id).populate('assignedToUser');              

                SessionModel
                  .find({account: populatedTask.assignedToUser.account})
                  .exec( (err, sessions) => {
                    if (err) {
                      console.log("Error finding sessions");
                    } else {
                      console.log("Found sessions", sessions.length);
                      
                      sessions.map(someSession => {

                        if (someSession.android_push_token){
                           
                              helpers.sendAndroidPushNotification (someSession.android_push_token, 
                                  {title: "New task assigned!", body: task.name}, {taskID: task._id}, "new_task");
                        }


                      })

                    }
                  });
              }


              res
                .status(201) //Created
                .json(task);
                      
            }
          });

    } else{
       
        res.status(401).json({ "message" : 'Unauthorized user'}); //Unauthorized

    }

  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized
  }


};


module.exports.getOneTask = async (req, res) => {
  
  var id = req.params.taskId;

  console.log('GET taskId', id);

  const loggedUser = await UserModel.findOne({account:req.account});

  //any logged in user can see other user's info
  if (loggedUser){

    await TaskModel
      .findById(id)
      .populate("createdByUser", "-password -android_push_token")
      .populate("assignedToUser", "-password -android_push_token")
      .exec(function(err, doc) {
        var response = {
          status : 200,
          message : doc
        };
        if (err) {
          console.log("Error finding task");
          response.status = 500; //Internal server error
          response.message = err;
        } else if(!doc) {
          console.log("taskId not found in database", id);
          response.status = 404; //Not found
          response.message = {
            "message" : "taskId ID not found " + id
          };
        }
        res
          .status(response.status)
          .json(response.message);
      });

  } else {

      res.status(401).json({ "message" : 'No authorized user found'}); //Unauthorized

  }

};



module.exports.updateOneTask = async (req, res) => {
  var taskId = req.params.taskId;

  console.log('PUT taskId', taskId);

  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

      await TaskModel
        .findById(taskId)
        .exec((err, task) =>{
          if (err) {
            console.log("Error finding task");
            res
              .status(500)
              .json(err);
            return;

          } else if(!task) {
            console.log("taskId not found in database", taskId);
            res
              .status(404)
              .json({
                "message" : "Task ID not found " + taskId
              });
            return;

            //You wont be able to update a task unless you are an admin or you are trying to update a task assigned to you (wether you are an admin or user)
          } else if (loggedUser.user_type != "admin" ){

            var hasNoPermission = false;

            if (!task.assignedToUser){
              hasNoPermission = true;
            } else if (!task.assignedToUser.equals(loggedUser._id)){
              hasNoPermission = true;
            }

            if (hasNoPermission){

              console.log(task.assignedToUser);
              console.log(loggedUser._id);

              res
                .status(401)
                .json({ 
                  "message" : 'Unauthorized user'
                });
              return; 

            }

          }


          //an admin can update a bunch of a task's attributes, wether the task is assigned to him or not
          if ( loggedUser.user_type === "admin"){

            if (req.body.name)
              task.name = req.body.name;

            if (req.body.description)
              task.description = req.body.description;

            if (req.body.dueDate)
              task.dueDate = req.body.dueDate;

            if (req.body.assignedToUser)
              task.assignedToUser = req.body.assignedToUser;

          } 

          //a user can only update a task's status, and only if such task is assigned to him
          if (req.body.status != null) 
            task.status = req.body.status;



          task
            .save(async (err, taskUpdated) => {
              if(err) {
                res
                  .status(500)
                  .json(err);
              } else {

                    if (taskUpdated.assignedToUser){

                      if (!loggedUser._id.equals(taskUpdated.assignedToUser)){

                          var populatedTask = await TaskModel.findById(taskUpdated._id).populate('assignedToUser', "-password -android_push_token");              

                          SessionModel
                            .find({account: populatedTask.assignedToUser.account})
                            .exec( (err, sessions) => {
                              if (err) {
                                console.log("Error finding sessions");
                              } else {
                                console.log("Found sessions", sessions.length);
                                
                                sessions.map(someSession => {

                                  if (someSession.android_push_token){
                                     
                                        helpers.sendAndroidPushNotification (someSession.android_push_token, 
                                            {title: "A task was updated!", body: taskUpdated.name}, {taskID: taskUpdated._id}, "updated_task");
                                  }

                                })

                              }
                            });
                      }

                    }

                      var populatedTask = await TaskModel.findById(taskUpdated._id)
                                                         .populate("createdByUser", "-password -android_push_token")
                                                         .populate('assignedToUser', "-password -android_push_token");

                      res
                        .status(200)
                        .json(populatedTask);
                    }
                  });



        });


  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'});
  }

};


module.exports.deleteOneTask = async (req, res) => {
  var taskId = req.params.taskId;

  const loggedUser = await UserModel.findOne({account:req.account});

  if (loggedUser){

    //a task can only be deleted by an admin
    if (loggedUser.user_type === "admin" ){

      await TaskModel
        .findByIdAndRemove(taskId)
        .exec(function(err, task) {
          if (err) {
            res
              .status(500) //Internal server error
              .json(err);
          } else {
            console.log("Task deleted, id:", taskId);
            res
              .status(204) //No content
              .json();        
          }
        });

    } else {

          res.status(401).json({ "message" : 'Unauthorized user'});
    }

  } else {
    
        res.status(401).json({ "message" : 'No authorized user found'});
  }


};






