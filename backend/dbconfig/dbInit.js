var admin = require("firebase-admin");

var serviceAccount = require("./tictest-f37a7-firebase-adminsdk-vwm7x-b179d1e5e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

module.exports = db