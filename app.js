const express = require('express');
const chalk = require('chalk');
const fs = require('fs'); // to read and write files in nodejs
const dotenv = require('dotenv');

const { reader } = require('./function/reader');

dotenv.config({
  path: './config.env',
});

const { PORT } = process.env;

global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

const { writeFile, readFile, writeFileSync, readFileSync } = fs;

const app = express();

// `Middleware
app.use(express.json()); // to parse json

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

app.get('/', (req, res) => {
  // _(req.query.name); //` "name=sanjay" -> {name : sanjay}
  // readFile('./database.json', 'utf8', (err, data) => {
  //   data = JSON.parse(data);
  //   if (err) {
  //     _(err);
  //     res.status(500).json({
  //       status: 'error',
  //       message: 'Internal Server Error',
  //     });
  //   } else {
  //     res.status(200).json({
  //       status: 'success',
  //       data,
  //       message: `${data.length} records found`,
  //     });
  //   }
  // });

  reader((data) => {
    if (!data) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data,
      message: `${data.length} records found`,
    });
  });
});

app.post('/', (req, res) => {
  const { body } = req; //` user send  body

  const { name, email, code, person } = body;

  if (!name || !email || !code || !person) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide all the fields i.e name, email, code, person',
    });
    return;
  }

  readFile('./database.json', 'utf8', (err, data) => {
    data = JSON.parse(data);

    const unique = data.find((item) => item.name === name);

    if (unique) {
      res.status(400).json({
        status: 'error',
        message: 'Name already exists',
      });
    }

    if (err) {
      _(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
      return;
    }

    // const toWrite = [...data, { name, email, code, person }];
    // const stringified = JSON.stringify(toWrite);

    data.push({ name, email, code, person });

    data = JSON.stringify(data);

    writeFile('./database.json', data, 'utf8', (err) => {
      if (err) {
        _(err);
        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
        return;
      }

      res.status(201).json({
        status: 'success',
        message: `${body.name} added successfully`,
      });
    });
  });
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
