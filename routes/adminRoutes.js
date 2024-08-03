// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/checkAdmin");
const adminController = require("../controllers/adminController");

router.post("/create-match", checkAdmin, adminController.createMatch);
router.put("/update-match", checkAdmin, adminController.updateMatchResult);

module.exports = router;
