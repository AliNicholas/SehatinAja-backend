const { admin, firebase } = require("../config/firebase");
const { bucket, bucketName } = require("../config/cloud-storage");

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
      res.json(users);
    });
  console.error(error);
  res.status(500).json({ error: "Something went wrong." });
}

async function getUserById(req, res) {
  const { uid } = req.user;

  try {
    const user = await admin.auth().getUser(uid);

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
  const { uid } = req.user;

  const updateData = {
    email,
    password,
  };

  admin
    .auth()
    .updateUser(uid, updateData) // Use 'id' instead of 'uid'
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
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded." });
      return;
    }

    // Simpan gambar ke Google Cloud Storage
    const uniqueFilename = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(uniqueFilename);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image." });
    });

    stream.on("finish", async () => {
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

      const imageRef = await imagesCollection.add({ path: imageUrl });
      const imageId = imageRef.id;

      res
        .status(200)
        .json({ message: "Image uploaded successfully.", imageId });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image." });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  uploadUserPhoto,
};
