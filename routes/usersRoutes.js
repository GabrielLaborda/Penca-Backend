const express = require("express");
const router = express.Router();
const { loginUser, Store } = require("../controllers/userController");

router.post("/", Store);
router.post("/login", loginUser);

module.exports = router;
