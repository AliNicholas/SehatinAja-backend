const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  uploadUserPhoto,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/users", getAllUsers);

router.get("/users/:id", authenticate, getUserById);

router.put("/users/:id", authenticate, updateUserById);

router.post("/users", authenticate, uploadUserPhoto);

module.exports = router;
