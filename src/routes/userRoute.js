const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  uploadUserPhoto,
} = require("../controllers/userController");
const { authenticateAccessToken } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

router.get("/users", getAllUsers);

router.get("/users/user", authenticateAccessToken, getUserById);

router.put("/users/user", authenticateAccessToken, updateUserById);

router.post(
  "/users",
  authenticateAccessToken,
  upload.single("image"),
  uploadUserPhoto
);

module.exports = router;
