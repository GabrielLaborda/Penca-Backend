const Stadiums = require("../models/Stadiums");

// Index: Obtener todos los estadios
exports.Index = async (req, res) => {
  try {
    // Obtener todos los estadios
    const stadiums = await Stadiums.find();
    res.status(200).json(stadiums);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los estadios", error });
  }
};
