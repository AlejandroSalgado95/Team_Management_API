var mongoose = require('mongoose');


var messageSchema = new mongoose.Schema({

  content : {
    type : String,
    required : true
  },

  sendedBy : {
      _id : {
        type : String,
        required : true
      },
      account : {
        type : String,
        required : true
      },
      name : {
        type : String,
        required : true
      },
      role : {
        type: String,
        required : true,
      },
      user_type : {
        type: String,
        enum: ['admin', 'user'],
        required : true
      }
  },

  createdOn : {
    type : Number,
    required: true
  }

});

module.exports = mongoose.model('Message', messageSchema);