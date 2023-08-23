const fs = require('fs');
const path = require('path');

const utilFiles = fs.readdirSync(path.join(__dirname, 'utils'));
const utils = {};

utilFiles.forEach(fileName => {
  const utilsName = path.parse(fileName).name;
  utils[utilsName] = require(path.join(__dirname, 'utils', fileName));
});
module.exports = utils;
