const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/", matchController.createMatch);
router.get("/", matchController.getMatches);
router.put("/:id", matchController.updateMatchResult);

module.exports = router;
