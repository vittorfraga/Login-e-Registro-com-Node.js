const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController");
const {
  validateFields,
  validateLoginFields,
} = require("../middlewares/validateFields");

authRouter.post("/register", validateFields, authController.register);
authRouter.post("/login", validateLoginFields, authController.login);

module.exports = authRouter;
