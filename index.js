'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI ||
  'mongodb://localhost/imageboard_app_dev');

const imageRouter = require(__dirname + '/routes/image_routes');

app.use('/api', imageRouter);
app.use(express.static(__dirname + '/build'));

module.exports = app
  .listen(port, () => console.log(`listening on port: ${port}`));
