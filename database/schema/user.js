const mongoose = require('mongoose');

const { Schema } = mongoose;

const starCollectionKeRules = new Schema({
  name: {
    type: String,
    required: true,
  },
  distance: Number,
  temperature: {
    type: Number,
    default: 1000,
  },
  person: String,
  address: {
    type: String,
    default: 'Indore',
  },
  code: String,
  date: String,
  email: String,
});

const startCollection = mongoose.model('stars', starCollectionKeRules);

module.exports = startCollection;
