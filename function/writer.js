const fs = require('fs'); // to read and write files in nodejs
const { writeFile } = fs;

const writer = (data, callback) => {
  writeFile('./database.json', data, 'utf8', () => {
    callback(data);
  });
};

module.exports = {
  writer,
};
