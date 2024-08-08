require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
const routes = require("./routes");

// Configuracion de la aplicación
const app = express();
app.use(cors());
app.use(express.json());
// Rutas
routes(app);

// Conexión a MongoDB
connectDB();

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
