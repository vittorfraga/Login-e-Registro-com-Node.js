require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);

mongoose.set("strictQuery", true);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.gq6iipx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
  })
  .catch((err) => console.log(eer));

app.listen(3000);
