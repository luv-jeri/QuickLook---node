const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
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

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
