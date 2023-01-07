const express = require("express");
require("dotenv").config();
const getUser = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

const userRouter = express.Router();

userRouter.get("/user/:id", checkToken, getUser);

module.exports = userRouter;
