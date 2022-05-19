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
const Todo = require('./database/schema/todo.schema');
const { addTodo } = require('./controllers/todo.controller');

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use(
  cors({
    origin: '*',
  })
);

app
  .route('/')
  .post(addTodo)
  .get(async (req, res) => {
    const documents = await Todo.find();
    res.status(200).json({
      message: 'data found',
      data: documents,
    });
  });

const { PORT } = process.env;

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
