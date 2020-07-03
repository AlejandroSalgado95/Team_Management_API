var mongoose = require('mongoose');


var messageSchema = new mongoose.Schema({

  content : {
    type : String,
    required : true
  },

  sendedBy : {
      name : {
        type: String,
        required : true
      },
      userID : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
      }
  },

  createdOn : {
    type : Number,
    required: true
  }

});

module.exports = mongoose.model('Message', messageSchema);