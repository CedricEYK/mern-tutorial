const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const colors = require("colors");

//* Middlewares
const connectDataBase = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");

const port = process.env.PORT || 5000;

//* Initialise express
const app = express();

//* BodyParser middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(morgan("dev"));

//* Routes
app.use(require("./routes/goals"));

app.use(errorHandler);

connectDataBase(() => {
  app.listen(
    port,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
  );
});
