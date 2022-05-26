const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please Provide a Title'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  task: {
    type: String,
    required: [true, 'PLease Provide a task'],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  person: {
    type: String,
    default: 'Anonymous',
    lowercase: true,
  },
  phone: {
    type: String,
    validate: [validator.isMobilePhone, 'Please provide a valid mobile number'],
  },
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
