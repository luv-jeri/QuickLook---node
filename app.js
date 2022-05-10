const chalk = require('chalk');
const http = require('http');

global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

const page = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">  
      <title>Hello World</title>
      <style>
      body{
        display : flex;
        justify-content : center;
        align-items : center;
        height : 100vh;
        width : 100vw;
        background-color : #333;
        color : #fff;
      }</style>
      </head>
      
      <body>
        <h1>Hello World</h1>
      </body>
  </html>
          `;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url === '/') {
    res.write('You are at the home page');
  }
  if (req.url === '/date') {
    const today = new Date().toDateString();
    res.write(today);
  }

  if (req.url === '/html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
  }
  res.end();
});

server.listen('8080', () => {
  _('Server is running on port 8080');
});
