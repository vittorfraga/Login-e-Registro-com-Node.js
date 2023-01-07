const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  const { name, email, password, confirmpassword } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res
      .status(422)
      .json({ msg: "O email informado ja esta sendo utilizado" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordToString = password.toString();
  const passwordHash = await bcrypt.hash(passwordToString, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msn: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "erro de servidor" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(404).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "erro de servidor" });
  }
}

module.exports = {
  register,
  login,
};
