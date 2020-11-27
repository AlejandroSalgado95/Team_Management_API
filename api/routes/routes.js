var express = require('express');
var router = new express.Router();

var userController = require('../controllers/user.controller');
var taskController = require('../controllers/task.controller');
var commentController = require('../controllers/comment.controller');
var messageController = require('../controllers/message.controller');
var sessionController = require('../controllers/session.controller');
var notificationController = require('../controllers/notification.controller');




//CRUD User routes
router
  .route('/users')
  .get(sessionController.authenticate, userController.getAllUsers); //READ 

router
  .route('/users/:userId')
  .get(sessionController.authenticate, userController.getOneUser) // READ
  .put(sessionController.authenticate, userController.updateOneUser) //UPDATE
  .delete(sessionController.authenticate, userController.deleteOneUser); //DELETE

router
  .route('/users/register')
  .post(sessionController.authenticate, userController.register); //CREATE




//CRUD Task routes
router
  .route('/tasks')
  .get(sessionController.authenticate, taskController.getAllTasks) //READ 
  .post(sessionController.authenticate, taskController.addOneTask) //CREATE

router
  .route('/tasks/:taskId')
  .get(sessionController.authenticate, taskController.getOneTask) // READ
  .put(sessionController.authenticate, taskController.updateOneTask) //UPDATE
  .delete(sessionController.authenticate, taskController.deleteOneTask); //DELETE

  router
    .route('/users/:userId/tasks')
    .get(sessionController.authenticate, taskController.getTasksFromUser); //READ




//CRUD Comments routes
router
  .route('/tasks/:taskId/comments')
  .post(sessionController.authenticate, commentController.addOneComment) //CREATE




//CRUD Messages routes
router
  .route('/messages')
  .get(sessionController.authenticate, messageController.getSomeMessages) //READ




//Session routes
router
    .route('/login')
    .post(sessionController.login); //Create session and provide access token


router
    .route('/logout')
    .post(sessionController.authenticate, sessionController.logout); // Delete session and revoke access token


//Notification routes
router
    .route('/save_android_push_token')
    .post(sessionController.authenticate, notificationController.saveAndroidPushToken); //Save Android Push Token





module.exports = router;