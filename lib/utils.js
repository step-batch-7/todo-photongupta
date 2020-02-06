const fs = require('fs');

let id = new Date().valueOf();

const generateId = function() {
  return id++;
};

const allReplace = function(content, replacement) {
  let newContent = content;
  for (const target in replacement) {
    const replacer = replacement[target];
    newContent = newContent.split(target).join(replacer);
  }
  return newContent;
};

const fileNotPresent = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const getLeftItems = function(todo) {
  let leftItems = todo.todoItems.filter(item => item.isDone);
  formatedLeftItem = `${leftItems.length}/${todo.todoItems.length}`;
  return formatedLeftItem;
};

module.exports = {allReplace, generateId, fileNotPresent, getLeftItems};
