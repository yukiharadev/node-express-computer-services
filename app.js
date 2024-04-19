const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const customersRouters = require("./api/routers/cusomers")
const serviceRouters = require("./api/routers/services")

mongoose
  .connect("mongodb://localhost:27017/node-rest-computer-repair")
  .then(() => console.log("Connected to Database!"));
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use("/uploads",express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/customers", customersRouters);
app.use("/services", serviceRouters);

app.use((req, res, next) => {
    const error = new Error("Not found - Please using Postman");
    error.status = 404;
    next(error);
  });
  
  app.use((req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  module.exports = app