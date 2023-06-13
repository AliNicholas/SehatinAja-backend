const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  deleteAccount,
} = require("../controllers/authController");
const { authenticateAccessToken } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticateAccessToken, logout);
router.delete("/delete-account", authenticateAccessToken, deleteAccount);

module.exports = router;
