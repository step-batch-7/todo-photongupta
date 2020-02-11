const fs = require('fs');

const generateId = function(list) {
  const lastElement = list[list.length - 1];
  const maxId = lastElement ? lastElement.id : 0;
  return maxId + 1;
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
  const leftItems = todo.todoItems.filter(item => item.isDone);
  const formatedLeftItem = `${leftItems.length}/${todo.todoItems.length}`;
  return formatedLeftItem;
};

module.exports = {allReplace, generateId, fileNotPresent, getLeftItems};
