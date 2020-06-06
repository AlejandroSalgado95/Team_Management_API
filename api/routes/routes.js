var express = require('express');
var router = new express.Router();

var userController = require('../controllers/user.controller');
var taskController = require('../controllers/task.controller');


//CRUD User routes
router
  .route('/users')
  .get(userController.authenticate, userController.getAllUsers); //READ 

router
  .route('/users/:userId')
  .get(userController.authenticate, userController.getOneUser) // READ
  .put(userController.authenticate, userController.updateOneUser) //UPDATE
  .delete(userController.authenticate, userController.deleteOneUser); //DELETE

router
  .route('/users/register')
  .post(userController.authenticate, userController.register); //CREATE




//CRUD Task routes
router
  .route('/tasks')
  .get(userController.authenticate, taskController.getAllTasks) //READ 
  .post(userController.authenticate, taskController.addOneTask) //CREATE

router
  .route('/tasks/:taskId')
  .get(userController.authenticate, taskController.getOneTask) // READ
  .put(userController.authenticate, taskController.updateOneTask) //UPDATE
  .delete(userController.authenticate, taskController.deleteOneTask); //DELETE

  router
    .route('/users/:userId/tasks')
    .get(userController.authenticate, taskController.getTasksFromUser); //READ




//Handy routes

router
    .route('/users/login')
    .post(userController.login); //Authentication

router
    .route('/users/android_push_token')
    .post(userController.authenticate, userController.saveAndroidPushToken); //Android Push Token





module.exports = router;