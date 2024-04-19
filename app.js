const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-rest-computer-repair').then(() => console.log('Connected!'));

mongoose.Promise = global.Promise

app.use(morgan("dev"));



module.exports = app;