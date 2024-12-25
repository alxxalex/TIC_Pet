var admin = require("firebase-admin");

var serviceAccount = require("./tictest-f37a7-firebase-adminsdk-vwm7x-d5d9a05f3c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "tictest-f37a7.firebasestorage.app"
});

const db = admin.firestore()
const storage = admin.storage().bucket();

module.exports = {db,storage}