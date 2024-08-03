const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  group: { type: String, required: true },
  abbreviation: { type: String, required: true },
  flagUrl: { type: String, required: true },
  points: { type: Number, default: 0 },
  played: { type: Number, default: 0 },
  won: { type: Number, default: 0 },
  drawn: { type: Number, default: 0 },
  lost: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  goalDifference: { type: Number, default: 0 },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
