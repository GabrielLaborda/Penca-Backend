const Team = require("../models/Teams");

// Index: Obtener todos los equipos y agruparlos por grupo
exports.Index = async (req, res) => {
  try {
    // Obtener todos los equipos
    const teams = await Team.find();

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los equipos", error });
  }
};

// Update: Actualizar los puntos de un equipo
exports.Update = async (req, res) => {
  const { teamId, points, goalsFor, goalsAgainst } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    team.points += points;
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
    team.goalDifference = team.goalsFor - team.goalsAgainst;
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error actualizando los puntos del equipo", error });
  }
};
