// controllers/adminController.js
const Match = require("../models/Match");
const Team = require("../models/Teams");

exports.createMatch = async (req, res) => {
  const { homeTeam, awayTeam, date } = req.body;

  try {
    const newMatch = new Match({ homeTeam, awayTeam, date });
    await newMatch.save();

    res
      .status(201)
      .json({ message: "Partido creado exitosamente", match: newMatch });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el partido", error });
  }
};

exports.updateMatchResult = async (req, res) => {
  const { matchId, homeTeamGoals, awayTeamGoals } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();

    res
      .status(200)
      .json({ message: "Resultado del partido actualizado", match });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el resultado del partido", error });
  }
};
