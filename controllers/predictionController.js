const Prediction = require("../models/Prediction");
const Match = require("../models/Match");
const User = require("../models/User");
const UserGroup = require("../models/UserGroups");

exports.userPrediction = async (req, res) => {
  const { userId, matchId, groupId, homeScore, awayScore } = req.body;

  try {
    if (groupId === null) {
      // Obtener todos los grupos del usuario
      const userGroups = await UserGroup.find({ members: userId });

      const promises = userGroups.map(async (group) => {
        let prediction = await Prediction.findOne({
          userId,
          matchId,
          groupId: group._id,
        });

        if (prediction) {
          // Actualizar pronóstico existente
          prediction.homeScore = homeScore;
          prediction.awayScore = awayScore;
        } else {
          // Crear nuevo pronóstico
          prediction = new Prediction({
            userId,
            matchId,
            groupId: group._id,
            homeScore,
            awayScore,
          });
        }

        return prediction.save();
      });

      await Promise.all(promises);
      res.status(200).json({
        message: "Pronósticos guardados para todos los grupos exitosamente",
      });
    } else {
      let prediction = await Prediction.findOne({ userId, matchId, groupId });

      if (prediction) {
        // Actualizar pronóstico existente
        prediction.homeScore = homeScore;
        prediction.awayScore = awayScore;
      } else {
        // Crear nuevo pronóstico
        prediction = new Prediction({
          userId,
          matchId,
          groupId,
          homeScore,
          awayScore,
        });
      }

      await prediction.save();
      res.status(200).json({ message: "Pronóstico guardado exitosamente" });
    }
  } catch (error) {
    console.error("Error guardando pronóstico:", error);
    res.status(500).json({ message: "Error guardando pronóstico" });
  }
};

// Calcular puntos obtenidos por el usuario basados en el resultado del partido.
const calculatePoints = (prediction, match) => {
  if (match.homeScore === null || match.awayScore === null) {
    return 0; // Si el partido no ha sido jugado, no hay puntos
  }
  let points = 0;

  // Calculos de puntaje.
  if (
    prediction.homeScore === match.homeScore &&
    prediction.awayScore === match.awayScore
  ) {
    points = 6; // Puntos por acertar el resultado exacto.
  } else if (
    (prediction.homeScore > prediction.awayScore &&
      match.homeScore > match.awayScore &&
      (prediction.homeScore === match.homeScore ||
        prediction.awayScore === match.awayScore)) ||
    (prediction.homeScore < prediction.awayScore &&
      match.homeScore < match.awayScore &&
      (prediction.homeScore === match.homeScore ||
        prediction.awayScore === match.awayScore))
  ) {
    points = 4; // Puntos por acertar Ganador y adivinar la cantidad de goles de 1 equipo.
  } else if (
    (prediction.homeScore > prediction.awayScore &&
      match.homeScore > match.awayScore) ||
    (prediction.homeScore < prediction.awayScore &&
      match.homeScore < match.awayScore) ||
    (prediction.homeScore === prediction.awayScore &&
      match.homeScore === match.awayScore)
  ) {
    points = 3; // Puntos por acertar Ganador
  } else if (
    prediction.homeScore === match.homeScore ||
    prediction.awayScore === match.awayScore
  ) {
    points = 1;
  } else {
    points = 0; // Puntos por errar Ganador y no acertar ningun gol de los equipos.
  }

  return points;
};

exports.getUserPredictions = async (req, res) => {
  const { userId } = req.params;
  const { groupId } = req.query; // Obtener groupId de la consulta

  try {
    const query = { userId };
    if (groupId) {
      query.groupId = groupId;
    }

    const predictions = await Prediction.find(query).populate("matchId");
    // Calcular puntos para cada predicción
    const predictionsWithPoints = predictions.map((prediction) => {
      const match = prediction.matchId;
      const points = calculatePoints(prediction, match);
      return { ...prediction._doc, points };
    });

    res.status(200).json(predictionsWithPoints);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo las predicciones" });
  }
};

exports.userResults = async (req, res) => {
  const { userId } = req.params;
  const { groupId } = req.query;
  const currentDate = new Date();

  try {
    const query = { userId };
    if (groupId && groupId !== "general") {
      query.groupId = groupId;
    }

    const predictions = await Prediction.find(query).populate("matchId");
    const results = [];

    for (let pred of predictions) {
      const match = pred.matchId;
      if (
        match &&
        match.matchDate <= currentDate &&
        match.homeScore !== null &&
        match.awayScore !== null
      ) {
        const points = calculatePoints(pred, match);
        results.push({ match, prediction: pred, points });
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error obteniendo resultados:", error);
    res.status(500).json({ message: "Error obteniendo resultados" });
  }
};

exports.getUserGroups = async (req, res) => {
  const { userId } = req.params;

  try {
    const userGroups = await UserGroup.find({ members: userId });
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los grupos" });
  }
};

exports.getRanking = async (req, res) => {
  const { groupId } = req.query; // Obtener groupId de la consulta

  try {
    const users = await User.find({});
    const ranking = [];
    const currentDate = new Date();

    for (let user of users) {
      const query = { userId: user._id };
      if (groupId) {
        query.groupId = groupId;
      }

      const predictions = await Prediction.find(query).populate("matchId");

      let totalPoints = 0;

      for (let pred of predictions) {
        const match = pred.matchId;

        // Verificación y log para asegurarse de que el partido y sus campos no son nulos
        if (!match) {
          continue;
        }

        if (
          match.matchDate <= currentDate &&
          match.homeScore !== null &&
          match.awayScore !== null
        ) {
          const points = calculatePoints(pred, match);
          totalPoints += points;
        }
      }

      ranking.push({
        user: user.username,
        userId: user._id,
        totalPoints: totalPoints,
      });
    }

    // Ordenar el ranking por totalPoints en orden descendente
    ranking.sort((a, b) => b.totalPoints - a.totalPoints);

    res.status(200).json(ranking);
  } catch (error) {
    console.error("Error fetching ranking:", error); // Log del error
    res.status(500).json({ message: "Error fetching ranking" });
  }
};
