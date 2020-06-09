var mongoose = require('mongoose');

var taskCommentSchema = new mongoose.Schema({

  //No ref is needed for the userID because I wont use the attribute for population
  postedBy : {
    name : {
      type: String,
      required : true
    },
    userID : {
      type: mongoose.Schema.Types.ObjectId,
      required : true
    }
  },

  content : {
    type : String,
    required : true
  },

  createdOn : {
    type : Number,
    required: true;
  }

});


var taskSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type: String,
    required : true,
    maxlength : 200,
    match: /[a-z]/
  },

  createdByUser : {    
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required : true
  },

  creationDate : {
    type : Number,
    required : true
  },

  dueDate : {
    type : Number,
    required : true
  },

  assignedToUser : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required : true
  },

  status: {
    
    type: Boolean,
    required : true

  },

  taskComments : [taskCommentSchema]

  
});

module.exports = mongoose.model('Task', taskSchema);