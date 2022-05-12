const express = require('express');
const chalk = require('chalk');
const fs = require('fs'); // to read and write files in nodejs
const dotenv = require('dotenv');
const cors = require('cors');

const { reader } = require('./function/reader');
const { writer } = require('./function/writer');

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

  const callback = (data) => {
    const dataWithOutCode = data.map((item) => {
      return {
        name: item.name,
        email: item.email,
        person: item.person,
      };
    });
    if (!data) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: dataWithOutCode,
      message: `${data.length} records found`,
    });
  };

  reader(callback);
});

app.post('/', (req, res) => {
  const { body } = req; //` user send  body

  const { name, email, code, person } = body; // destructuring for the safe side

  if (!name || !email || !code || !person) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide all the fields i.e name, email, code, person',
    });
    return;
  }

  readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      __(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }

    data = JSON.parse(data); //` current data in database.json -> []

    const unique = data.find((item) => item.name === name);

    if (unique) {
      res.status(400).json({
        status: 'error',
        message: 'Name already exists',
      });
    }

    // const toWrite = [...data, { name, email, code, person }];
    // const stringified = JSON.stringify(toWrite);

    const newStar = { name, email, code, person };

    data.push(newStar);

    data = JSON.stringify(data);
    //* Make a custom function to write the data to the file
    writeFile('./database.json', data, 'utf8', () => {
      res.status(201).json({
        status: 'success',
        message: `${body.name} added successfully`,
      });
    });
  });
});

app.patch('/', (req, res) => {
  __(req.query);

  const { to_update } = req.query; // name of the start to update

  readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      _(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }

    data = JSON.parse(data); // ` data -> []

    const index = data.findIndex((item) => item.name === to_update); // find the index of the item to update

    if (index === -1) {
      res.status(400).json({
        status: 'error',
        message: `Star with name - ${to_update} not found`,
      });

      return;
    }

    if (data[index].code !== req.query.code) {
      res.status(400).json({
        status: 'error',
        message: `Code not matched`,
      });

      return;
    }

    const { name, email, code, person } = req.body; // destructuring for the safe side

    // creating a object to update
    const updatedStar = {
      name: name || data[index].name,
      email: email || data[index].email,
      code: code || data[index].code,
      person: person || data[index].person,
    };

    data[index] = updatedStar; // actual update

    data = JSON.stringify(data);

    writeFile('./database.json', data, 'utf8', () => {
      res.status(200).json({
        status: 'success',
        message: `${to_update}  updated successfully`,
      });
    });
  });
});

app.delete('/', (req, res) => {
  const { to_delete } = req.query; // name of the start to delete

  readFile('./database.json', 'utf8', (err, data) => {
    data = JSON.parse(data); // ` data -> []

    const index = data.findIndex((item) => item.name === to_delete); // find the index of the item to delete

    if (index === -1) {
      res.status(400).json({
        status: 'error',
        message: `Star with name - ${to_delete} not found`,
      });

      return;
    }

    if (data[index].code !== req.query.code) {
      res.status(400).json({
        status: 'error',
        message: `Code not matched`,
      });

      return;
    }

    data.splice(index, 1); // actual delete

    data = JSON.stringify(data);

    writeFile('./database.json', data, 'utf8', () => {
      res.status(200).json({
        status: 'success',
        message: `${to_delete} deleted successfully`,
      });
    });
  });
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
