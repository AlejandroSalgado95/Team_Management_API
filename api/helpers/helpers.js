var FCM = require('fcm-node');

module.exports.androidPushNotification = async (androidPushToken, notification, data, collapseKey) => {

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