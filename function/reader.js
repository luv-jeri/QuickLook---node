const fs = require('fs'); // to read and write files in nodejs
const { readFile } = fs;

module.exports.reader = (callback) => {
  readFile('./database.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    callback(data);
  });
};
