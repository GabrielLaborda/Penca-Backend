const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  matchDate: { type: Date, required: true },
  stadium: { type: String, required: true },
  homeScore: { type: Number, default: null },
  awayScore: { type: Number, default: null },
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
