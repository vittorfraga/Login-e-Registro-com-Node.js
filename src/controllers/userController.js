const mongoose = require("mongoose");
const User = require("../models/User");

async function getUser(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const user = await User.findById(mongoose.Types.ObjectId(id), "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.json({ user });
}
module.exports = getUser;
