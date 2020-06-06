var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  account : {
    type : String,
    unique : true,
    dropDups: true,
    required : true
  },
  password : {
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
  },
  android_push_token: {
    type: String
  }

});

module.exports = mongoose.model('User', userSchema);