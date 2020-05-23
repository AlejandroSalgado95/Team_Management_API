var mongoose = require('mongoose');

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

  }
  
});

module.exports = mongoose.model('Task', taskSchema);