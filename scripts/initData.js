require("dotenv").config();
const connectDB = require("../db");
const Team = require("../models/Teams");
const Group = require("../models/Group");
const Stadium = require("../models/Stadiums");
const teamsData = require("./NationalsTeams");
const stadiumsData = require("./Stadiums");

// Establecer la conexión a la base de datos
connectDB();

// Lógica para cargar los equipos en la base de datos
async function loadData() {
  try {
    // Limpiar las colecciones existentes
    await Team.deleteMany({});
    await Group.deleteMany({});
    await Stadium.deleteMany({});

    // Cargar los equipos
    await Team.insertMany(teamsData);

    // Definir los grupos
    const groupsData = [
      { name: "Grupo A" },
      { name: "Grupo B" },
      { name: "Grupo C" },
      { name: "Grupo D" },
    ];

    // Insertar los grupos en la base de datos
    const groups = await Group.insertMany(groupsData);

    // Obtener todos los equipos desde la base de datos
    const allTeams = await Team.find();

    // Asignar los equipos a los grupos
    for (const group of groups) {
      // Filtrar los equipos correspondientes a este grupo
      const teamsForGroup = allTeams.filter(
        (team) => team.group === group.name
      );

      // Actualizar el grupo en la base de datos con las referencias a los equipos
      group.teams = teamsForGroup.map((team) => team._id);
      await group.save();
    }

    // Cargar los estadios
    await Stadium.insertMany(stadiumsData);

    console.log("Equipos, grupos y estadios cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar equipos, grupos y estadios:", error);
  }
}

// Llamar a la función para cargar los datos
loadData();
