// middlewares/checkAdmin.js
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permisos para esta acción" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no válido", error });
  }
};

module.exports = checkAdmin;
