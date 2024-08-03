const express = require("express");
const router = express.Router();
const { Index, Update } = require("../controllers/teamsController");

// Ruta para obtener todos los grupos y sus equipos
router.get("/", Index);

// Ruta para actualizar los puntos de un equipo
router.put("/updateTeamPoints", Update);

module.exports = router;
