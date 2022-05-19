global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
//` CONNECT TO DATABASE
require('./database/connection');
const startCollection = require('./database/schema/star.js');

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use(
  cors({
    origin: '*',
  })
);

app.post('/', (req, res) => {
  const body = req.body;

  startCollection
    .create(body)
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err,
      });
    });
});

app.get('/', (req, res) => {
  startCollection.find().then((data) => {
    res.status(200).json({
      status: 'success',
      data,
    });
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});

// const user = new mongoose.Schema({
//   name: String,
//   email: String,
//   phoneNumber: Number,
// });

// const userModal = mongoose.model('cars', user);

// userModal.create({
//   name: 'Mukesh',
//   email: 'mukesh@gmail.com',
// });

// userModal.find().then((data) => {
//   console.log(data);
// });
