const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUserById,
  uploadUserPhoto,
} = require("../controllers/userController");
const { authenticateAccessToken } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

router.get("/users", authenticateAccessToken, getUserById);

router.put("/users", authenticateAccessToken, updateUserById);

router.post(
  "/users",
  authenticateAccessToken,
  upload.single("image"),
  uploadUserPhoto
);

module.exports = router;
