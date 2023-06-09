const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");

const serviceAccount = require("../../credentials/firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

module.exports = {
  admin,
  firebase,
  db,
};
