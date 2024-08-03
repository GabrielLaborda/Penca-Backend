const express = require("express");
const router = express.Router();
const { uploadGroupsAndTeams } = require("../controllers/groupController");

// Ruta para obtener todos los grupos y sus equipos
router.get("/", uploadGroupsAndTeams);

module.exports = router;
