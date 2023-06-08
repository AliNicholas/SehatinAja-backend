const { admin, firebase } = require("../config/firebase");

function getAllUsers(req, res) {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
}

function getUserByUid(req, res) {
  const uid = req.body.uid;
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.json(userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      res.status(500).send("Error fetching user data");
    });
}

function updateUserByUid(req, res) {
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
}

function deleteUserByUid(req, res) {
  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log("Successfully deleted user");
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
    });
}

function getUserByEmail(req, res) {
  const email = req.body.email;
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.json(userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      res.status(500).send("Error fetching user data");
    });
}
