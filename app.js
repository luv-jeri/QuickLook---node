const chalk = require('chalk');
const http = require('http');

global.__ = console.log;
global._ = (_) => {
  __(chalk.blue.bgBlack(_));
};

const server = http.createServer((req, res) => {
  //  _(req); // ` Details of the request
  // _(req.url); // ` The URL of the request
  // __(res); // ` Details of the response
  //# response = {}

  res.writeHead(200, { 'Content-Type': 'application/json', isOK: true });
  //` response = {
  //`  header : {
  //`     'Content-Type': 'application/json'
  //`      status: 200
  //`  }
  //` }

  res.write(
    JSON.stringify({
      app: 'Node.js',
      version: '1.0.0',
      author: 'Rajesh',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    })
  );

  // ` response = {
  // `    header: {
  // `    'Content-Type': 'application/json',
  // `    status: 200,
  // `  },
  // `  body: {
  // `    app: 'Node.js',
  // `    version: '1.0.0',
  // `    version: '1.0.0',
  // `    author: 'Rajesh',
  // `    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  // `  },
  // ` }

  // __(res); // ` Details of the response
  res.end();
});

server.listen('8080', () => {
  _('Server is running on port 8080');
});
