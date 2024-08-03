const UserGroup = require("../models/UserGroups");
const User = require("../models/User");

const generateCode = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

exports.createGroup = async (req, res) => {
  const { name, adminId } = req.body;

  const code = generateCode(5);

  try {
    const newGroup = new UserGroup({
      name,
      code,
      admin: adminId,
      members: [adminId],
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creando el grupo" });
  }
};

exports.joinGroup = async (req, res) => {
  const { userId, code } = req.body;

  try {
    const group = await UserGroup.findOne({ code });

    if (!group) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "Ya eres miembro de este grupo" });
    }

    group.members.push(userId);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Error uniéndose al grupo" });
  }
};

exports.getUserGroups = async (req, res) => {
  const { userId } = req.params;

  try {
    const userGroups = await UserGroup.find({ members: userId });
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los grupos" });
  }
};

exports.getGroupsByAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const groups = await UserGroup.find({ admin: adminId });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los grupos" });
  }
};
