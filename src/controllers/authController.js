const axios = require("axios");
const { app, admin } = require("../config/firebase");

function register(req, res) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  };

  admin
    .auth()
    .createUser(userData)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);

      res.json(userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      res.status(500).send("Error fetching user data");
    });
}

function login(req, res) {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const apiKey = "AIzaSyC4NpJCCNXt3ClCDvl10tD12dsfYMet44k";

  const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  axios
    .post(signInUrl, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      res.status(200).json({ token: response.data.idToken });
      console.error("Login Successfully");
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      res.status(400).json({ error: "Failed to login" });
    });
}

// logout

// deleteAccount

// get user
app.get("/users", (req, res) => {
  const { email, password } = req.body;
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      const uid = userRecord.uid;
      console.log("UID pengguna:", uid);
      // Lakukan sesuatu dengan UID pengguna
    })
    .catch((error) => {
      console.log("Error mengambil UID pengguna:", error);
    });
});

// update user berdasarkan uid
app.post("/users", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  };

  admin
    .auth()
    .updateUser(uid, userData)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());

      res.json(userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error updating user:", error);
      res.status(500).send("Error fetching user data");
    });
});

// menghapus user dengan UID
app.delete("/users", (req, res) => {
  const uid = req.body.uid;
  admin
    .auth()
    .deleteUser(uid)
    .then((userRecord) => {
      console.log("Successfully deleted user");
      res.json(userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      res.status(500).send("Error fetching user data");
    });
});

module.exports = { register, login };
