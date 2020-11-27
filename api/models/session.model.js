var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  account : {
    type : String,
    required : true
  },
  session_id : {
    type : String,
    required : true,
    unique : true,
    dropDups: true,
  }, 
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '15d' },
  }, 
  android_push_token: {
    type: String
  }

});

module.exports = mongoose.model('Session', sessionSchema);