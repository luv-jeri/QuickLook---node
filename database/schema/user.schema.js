const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide an email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please Provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please Confirm your password'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function (value) {
        const isSame = value === this.password;
        return isSame;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 13);
  this.password = hashedPassword;
  this.confirmPassword = null;
});

const User = mongoose.model('user', userSchema);

module.exports = User;
