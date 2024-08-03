const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
