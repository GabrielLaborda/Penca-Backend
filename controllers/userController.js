const User = require("../models/User");
const Match = require("../models/Match");
const Prediction = require("../models/Prediction");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserGroup = require("../models/UserGroups");

const ADMIN_ID = "666a021e8a0e767ad2678b66";

// Comprobar que el Grupo General exista, sino lo creamos.
async function ensureGeneralGroupExists() {
  let generalGroup = await UserGroup.findOne({ name: "General" });
  if (!generalGroup) {
    generalGroup = new UserGroup({
      name: "General",
      code: "general",
      admin: ADMIN_ID,
      members: [],
    });
    await generalGroup.save();
  }
  return generalGroup;
}

// Crear usuario nuevo
exports.Store = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "El nombre de usuario o correo electrónico ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Pushear usuario nuevo a Grupo General.
    const generalGroup = await ensureGeneralGroupExists();
    generalGroup.members.push(newUser._id);
    await generalGroup.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro", error });
  }
};

// login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado");
      return res
        .status(400)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res
        .status(400)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};
