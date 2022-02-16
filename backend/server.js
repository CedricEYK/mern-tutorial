const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDataBase = require("./config/database");
const port = process.env.PORT || 5000;

const app = express();

app.use("/", (req, res, next) => {
  res.status(200).json({
    msg: "Hey!",
  });
});

connectDataBase(() => {
  app.listen(
    port,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
  );
});
