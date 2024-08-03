const Match = require("../models/Match");

exports.createMatch = async (req, res) => {
  try {
    console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);
    const matchData = {
      homeTeam: req.body.team1,
      awayTeam: req.body.team2,
      matchDate: new Date(req.body.date),
      stadium: req.body.stadium,
      homeScore: req.body.homeScore || 0,
      awayScore: req.body.awayScore || 0,
    };

    const newMatch = new Match(matchData);
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: "Error creando el partido", error });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo partidos", error });
  }
};

exports.updateMatchResult = async (req, res) => {
  try {
    const matchId = req.params.id;
    const updatedData = {
      homeScore: req.body.homeScore,
      awayScore: req.body.awayScore,
    };

    const updatedMatch = await Match.findByIdAndUpdate(matchId, updatedData, {
      new: true,
    });
    if (!updatedMatch) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el resultado", error });
  }
};
// Otros métodos CRUD para los partidos (listar, actualizar, eliminar)
