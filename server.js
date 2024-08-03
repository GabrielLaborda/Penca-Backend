require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");

// Configuracion de la aplicación
const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas

const userRoutes = require("./routes/usersRoutes");
const matchRoutes = require("./routes/matchRoutes");
const teamsRoutes = require("./routes/teamsRoutes");
const groupRoutes = require("./routes/groupRoutes");
const adminRoutes = require("./routes/adminRoutes");
const stadiumsRoutes = require("./routes/stadiumsRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const userGroupRoutes = require("./routes/userGroupsRoutes");
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/stadiums", stadiumsRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/usergroups", userGroupRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
