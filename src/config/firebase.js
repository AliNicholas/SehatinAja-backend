const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("../../credentials/Service_account_key.json");
const config = require("../../credentials/firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = config;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { app, admin };
