const fs = require('fs');

const generateId = function(list) {
  const lastElement = list[list.length - 1];
  const maxId = lastElement ? lastElement.id : 0;
  return maxId + 1;
};

const fileNotPresent = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

module.exports = {generateId, fileNotPresent};
