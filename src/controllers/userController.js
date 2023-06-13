const { admin, firebase } = require("../config/firebase");

function getAllUsers(req, res) {
  admin
    .auth()
    .listUsers()
    .then((userRecords) => {
      const users = userRecords.users.map((user) => {
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName || null,
          photoUrl: user.photoURL || null,
        };
      });
      res.json({ users });
    });
  console.error(error);
  res.status(500).json({ error: "Something went wrong." });
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await admin.auth().getUser(id);

    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

function updateUserById(req, res) {
  const { email, password } = req.body;
  const { id } = req.params;

  const updateData = {
    email,
    password,
  };

  admin
    .auth()
    .updateUser(id, updateData) // Use 'id' instead of 'uid'
    .then((userRecord) => {
      console.log("Successfully updated user", userRecord.toJSON());
      res.json("Updated");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Something went wrong." });
    });
}

async function uploadUserPhoto(req, res) {
  const destination = `images/profile/${email}/${file.filename}`; // path to save in the bucket and the file name
  const fileObject = cloudStorageConfig.bucket.file(destination);
  const filePath = `./public/images/${file.filename}`; // path to acces images

  try {
    const options = {
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: "publicRead", // set public access control in Cloud SQL
    };
    // store photo to Cloud SQL
    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(
        `./public/images/${file.filename}`
      );
      const writeStream = fileObject.createWriteStream(options);

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(writeStream);
    });
    // do delete file  in public/images directory after upload to Cloud SQL
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${err}`);
      }
    });
    //  if success Get the public URL
    const publicUrl = `https://storage.googleapis.com/${cloudStorageConfig.bucketName}/${destination}`;
    const photoUrl = {
      photoUrl: publicUrl,
    };
    // if success update user photoURL in firebase by firebase_uid
    await firebaseConfig.admin.auth().updateUser(firebase_uid, photoUrl);
    return publicUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  uploadUserPhoto,
};
