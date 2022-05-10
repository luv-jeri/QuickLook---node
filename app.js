const chalk = require('chalk');
const http = require('http');
const url = require('url');
const fs = require('fs'); // to read and write files in nodejs
global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};
const { writeFile, readFile, writeFileSync, readFileSync } = fs;

//# Creating a file Synchronously
// writeFileSync('file.txt', 'I was created by nodejs 😎');
// writeFileSync('index.js', 'console.log("Hello World !!")');
//# Reading a file Synchronously
// const data = readFileSync('./file.txt', 'utf8');
// _(data);

const page = readFileSync('./public/index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const parsed = url.parse(req.url); // to get the path of the url
  const { pathname, query } = parsed;

  // readFile('./ip.txt', 'utf8', (err, data) => {
  //   if (err) {
  //     _(err);
  //   }
  //   var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  //   const ipData = ` ${req.url} : ${ip}`;

  //   writeFile('./ip.txt', ipData + data, 'utf8', (err) => {
  //     if (err) {
  //       _(err);
  //     }
  //     _('IP list updated successfully');
  //   });
  // });

  if (pathname === '/') {
    res.write('You are at the home page');
  }
  if (pathname === '/date') {
    const today = new Date().toDateString();
    res.write(today);
  }
  if (pathname === '/page') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
  }
  if (pathname === '/say-hello') {
    res.write(`Hello ${query}`);
  }

  res.end();
});

server.listen('8080', () => {
  _('Server is running on port 8080');
});
