const express = require("express");
const router = express.Router();
const { Index } = require("../controllers/stadiumsController");

// Ruta para obtener todos los estadios
router.get("/", Index);

module.exports = router;
