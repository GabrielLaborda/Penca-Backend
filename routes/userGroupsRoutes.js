const express = require("express");
const router = express.Router();
const userGroupController = require("../controllers/userGroupsController");

// Ruta para crear un grupo
router.post("/create", userGroupController.createGroup);

// Ruta para unirse a un grupo
router.post("/join", userGroupController.joinGroup);

// Ruta para obtener los grupos de un usuario
router.get("/:userId", userGroupController.getUserGroups);

// Ruta para obtener los grupos que creo el usuario
router.get("/admin/:adminId", userGroupController.getGroupsByAdmin);

module.exports = router;
