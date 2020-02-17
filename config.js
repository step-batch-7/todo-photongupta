const fs = require('fs');

const createDataBaseDirectory = function() {
  if (!fs.existsSync('./dataBase')) {
    fs.mkdirSync('./dataBase');
  }
};

const createTodoStoreFile = function() {
  if (!fs.existsSync('./dataBase/todoList.json')) {
    fs.writeFileSync('./dataBase/todoList.json', JSON.stringify({}));
  }
};

const createUserStoreFile = function() {
  if (!fs.existsSync('./dataBase/userCredentials.json')) {
    fs.writeFileSync('./dataBase/userCredentials.json', JSON.stringify({}));
  }
};

const createSetup = function() {
  createDataBaseDirectory();
  createTodoStoreFile();
  createUserStoreFile();
};

module.exports = createSetup;
