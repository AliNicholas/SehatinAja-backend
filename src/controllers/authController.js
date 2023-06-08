const { admin, firebase } = require("../config/firebase");

async function register(req, res) {
  name = req.body.name;
  email = req.body.email;
  password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    res.status(500).json({
      message: "Successfully registered new user",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user",
      serverMessage: error,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    res.json({
      message: "success login",
      userRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to login",
      serverMessage: error,
    });
  }
}

async function logout(req, res) {
  const { uid } = req.body;

  try {
    await firebase.auth().signOut();

    res.json({
      message: "Successfully logged out",
      uid: uid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to logout",
      serverMessage: error,
    });
  }
}

module.exports = { register, login, logout };
