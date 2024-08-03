const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  homeScore: { type: Number, default: null, required: true },
  awayScore: { type: Number, default: null, required: true },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserGroups",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", predictionSchema);
