const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");

const serviceAccount = require("../../credentials/Service_account_key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyC4NpJCCNXt3ClCDvl10tD12dsfYMet44k",
  authDomain: "sehatinaja-c7205.firebaseapp.com",
  projectId: "sehatinaja-c7205",
  storageBucket: "sehatinaja-c7205.appspot.com",
  messagingSenderId: "738207239746",
  appId: "1:738207239746:web:36e0e915be0cb1f55367db",
  measurementId: "G-CWVTKL4EQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { app, admin };
