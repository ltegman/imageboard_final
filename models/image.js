'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: { type: String, required: true },
  caption: { type: String, required: true },
  submitter: { type: Schema.Types.ObjectId, required: false }
});

module.exports = exports = mongoose.model('Image', imageSchema);
