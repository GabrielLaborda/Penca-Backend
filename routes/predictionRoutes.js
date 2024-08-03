const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");

router.put("/save", predictionController.userPrediction);
router.get("/results/:userId", predictionController.userResults);
router.get("/ranking", predictionController.getRanking);
router.get("/:userId", predictionController.getUserPredictions);

module.exports = router;
