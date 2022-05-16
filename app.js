const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const cors = require('cors');
const {
  sendAllData,
  addANewStar,
  updateAStar,
  deleteAStar,
} = require('./controllers/startController'); // module.exports = {}

// const controller = require('./controllers/startController');

// console.log(controller);

dotenv.config({
  path: './config.env',
});

const { PORT } = process.env;

global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

const app = express();

// `Middleware
app.use(express.json()); // to parse json

app.use(
  cors({
    origin: '*',
  })
);

app.use((req, res, next) => {
  __(chalk.green(req.method, req.url), chalk.red(new Date().toLocaleString()));
  next();
});

app.use((req, res, next) => {
  _('Authentication middleware');
  const { key } = req.query;
  _(key);

  if (key === '123') {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      message: `Not Authorized , please provide correct key`,
    });
  }
});

app
  .route('api/v1/')
  .get(sendAllData)
  .post(addANewStar)
  .delete(deleteAStar)
  .patch(updateAStar);

// app.get('/', sendAllData);
// app.post('/', addANewStar);
// app.patch('/', updateAStar);
// app.delete('/', deleteAStar);

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
