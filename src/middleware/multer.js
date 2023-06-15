const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime(); // get time stamp
    const { originalname } = file; // get filename
    cb(null, `${timestamp}-${originalname}`); // save filename with this format
  },
});

const upload = multer({
  // storage: multer.memoryStorage(),
  storage,
  limits: {
    fileSize: 5 * 1000 * 1000,
  },
});

module.exports = { upload };
