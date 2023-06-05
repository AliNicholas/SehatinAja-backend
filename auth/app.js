const express = require("express");

const app = express();

// register
app.post("/register", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  };

  // contoh data user
  //   email: 'modifiedUser@example.com',
  //   phoneNumber: '+11234567890',
  //   emailVerified: true,
  //   password: 'newPassword',
  //   displayName: 'Jane Doe',
  //   photoURL: 'http://www.example.com/12345678/photo.png',
  //   disabled: true,

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
});

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const apiKey = "AIzaSyAwh4gYD8zefhLI5eYSz_-dPAq5wo2nVDE";

  const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  axios
    .post(signInUrl, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      // Login berhasil
      res.status(200).json({ token: response.data.idToken });
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      res.status(400).json({ error: "Failed to login" });
    });
});

// get user

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

const PORT = 8080;
app.listen($PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
