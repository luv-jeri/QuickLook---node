global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

global._catcher = (fn) => {
  const toReturn = (req, res, next) => {
    fn(req, res, next).catch((e) => next(e));
  };
  return toReturn;
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

const {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('./controllers/todo.controller');

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use((req, res, next) => {
  console.log('Middleware');
  next();
});

app.use(
  cors({
    origin: '*',
  })
);

app.route('/').post(addTodo).get(getTodo).patch(updateTodo).delete(deleteTodo);

app.route('*').all((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.log('Error Middleware');
  res.status(500).json({
    status: 'error',
    message: err,
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
