const express = require("express");
const router = express.Router();
const { screening } = require("../controllers/testController");

router.post("/penyakit-tulang", screening);

module.exports = router;
