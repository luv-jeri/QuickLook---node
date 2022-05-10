const chalk = require('chalk');
const __ = console.log;

const _e = (to_show) => {
  __(chalk.red.bgBlack(to_show));
};

const _s = (to_show) => {
  __(chalk.blue.bgBlack(to_show));
};

const _ = (to_show) => {
  __(chalk.white.bgBlack(to_show));
};

module.exports = {
  _e,
  _s,
  _,
};
