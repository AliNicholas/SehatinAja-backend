const { admin, firebase } = require("../config/firebase");
const { storage, bucketName } = require("../config/cloud-storage");
const fs = require("fs");

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
  const { email, password, name } = req.body;
  const { uid } = req.user;

  const updateData = {
    email,
    password,
    displayName: name,
  };

  admin
    .auth()
    .updateUser(uid, updateData) // Use 'id' instead of 'uid'
    .then((userRecord) => {
      console.log("Successfully updated user", userRecord.toJSON());
      res.json("Successfully updated user");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Something went wrong." });
    });
}

// async function uploadUserPhoto(req, res) {
//   const { uid } = req.user;
//   try {
//     if (!req.file) {
//       res.status(400).json({ error: "No file uploaded." });
//       return;
//     }
//     const file = req.file;

//     const fileName = Date.now() + "-" + file.originalname;
//     const bucket = storage.bucket(bucketName);
//     const fileData = bucket.file(fileName);
//     console.log(fileData);
//     const stream = fileData.createWriteStream({
//       gzip: true,
//       metadata: {
//         contentType: file.mimetype,
//       },
//       predefinedAcl: "publicRead",
//     });

//     stream.on("error", (error) => {
//       console.error(error);
//       res.status(500).json({ error: "Failed to upload image." });
//     });

//     stream.on("finish", async () => {
//       const photoUrl = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
//       await admin.auth().updateUser(uid, photoUrl);

//       res.json({
//         success: true,
//         message: "Photo uploaded successfully",
//         photoUrl: photoUrl,
//       });
//     });

//     stream.end(file.buffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload photo",
//       error: error.message,
//     });
//   }
// }

const uploadUserPhoto = async (req, res) => {
  const { uid } = req.user;
  const file = req.file;
  const bucket = storage.bucket(bucketName);
  const destination = `${uid}/${file.filename}`;
  const fileObject = bucket.file(destination);
  const filePath = `../images/${file.filename}`;

  try {
    const options = {
      gzip: true,
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: "publicRead",
    };

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fileObject.createWriteStream(options);

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(writeStream);
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${err}`);
      }
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
    const photoUrl = {
      photoUrl: publicUrl,
    };

    await admin.auth().updateUser(uid, photoUrl);

    res.json({
      message: "Photo uploaded successfully",
      photoUrl: publicUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to upload photo",
      error: error.message,
    });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  uploadUserPhoto,
};
