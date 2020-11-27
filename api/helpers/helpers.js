var FCM = require('fcm-node');
const UserModel = require('../models/user.model');
const MessageModel = require('../models/message.model');


module.exports.sendAndroidPushNotification =  (androidPushToken, notification, data, collapseKey) => {

    var serverKey = process.env.FIREBASE_SERVER_KEY;//put server key here
    var fcm = new FCM(serverKey);
    var token = androidPushToken;// put token here which user you have to send push notification
    var message = {
        to: token,
        collapse_key: collapseKey,
        notification: {title: notification.title, body: notification.body, sound: 'default', tag: collapseKey},
        data: data
    };
    
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error sending the message", err);
        } else {
            console.log("Successfully sended the message");
        }

    });
};

module.exports.addOneMessage = async (message, sender) => {
  console.log("POST new message");

  const loggedUser = await UserModel.findOne({account: sender});
           
  if (!loggedUser)
      return ;
            
  var createdMessage = await MessageModel.create({
      sendedBy : {
         name : loggedUser.name,
         _id : loggedUser._id,
         account: loggedUser.account,
         role: loggedUser.role,
         user_type: loggedUser.user_type
      },
      content : message,
      date : Date.now()
  });

  if (createdMessage)
    return createdMessage;
  else 
    return;
};


