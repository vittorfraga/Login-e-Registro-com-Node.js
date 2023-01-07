function validateFields(req, res, next) {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }
  next();
}

function validateLoginFields(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  next();
}

module.exports = { validateFields, validateLoginFields };
