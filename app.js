global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

global._catcher = (fn) => {
  const toReturn = (req, res, next) => {
    fn(req, res, next).catch((e) => {
      console.log(e);
      next(e);
    });
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

const todoRouter = require('./routes/todo.routes');
const userRouter = require('./routes/user.routes');

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use((req, res, next) => {
  console.log('Middleware');
  next();
});
app.use('/test ', (req, res, next) => {
  console.log('TEST Middleware');
  next();
});

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1/todo', todoRouter);
app.use('/api/v1/user', userRouter);

app.route('*').all((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
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
