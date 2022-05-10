const chalk = require('chalk');

const __ = console.log;

// __(global); // ` global object same for all the files in the project
// __(__dirname); // ` Current directory
// __(__filename); // ` current file name and path
//__(process); // ` cpu usage

//# Attach a global property to the global object
global.sayHello = () => {
  __(chalk.red('Hello World'));
};

sayHello();