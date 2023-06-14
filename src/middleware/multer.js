const Multer = require("multer");

const storage = Multer.memoryStorage();
const limits = {
  fileSize: 5 * 1024 * 1024, // Batasan ukuran file (5MB)
};

const upload = Multer({
  storage,
  limits,
});

module.exports = { upload };
