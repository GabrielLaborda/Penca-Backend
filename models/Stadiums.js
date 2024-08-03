const mongoose = require("mongoose");

const stadiumsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt fields
  }
);

const Stadiums = mongoose.model("Stadiums", stadiumsSchema);
module.exports = Stadiums;
