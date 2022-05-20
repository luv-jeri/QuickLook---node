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

const { addTodo, getTodo, updateTodo } = require('./controllers/todo.controller');

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use(
  cors({
    origin: '*',
  })
);

app.route('/').post(addTodo).get(getTodo).patch(updateTodo);

const { PORT } = process.env;

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
