'use strict';

const {writeFileSync} = require('fs');
const TodoLists = require('./lib/todoLists');
const USER_STORE = './dataBase/userCredentials.json';
const TODO_STORE = './dataBase/todoList.json';
const todoLists = require(TODO_STORE);
const userCredentials = require(USER_STORE);
const {app} = require('./lib/routes');

const defaultPort = 5000;

const main = function(port = defaultPort) {
  app.locals = {
    todoLists: TodoLists.load(todoLists),
    writer: writeFileSync,
    userCredentials,
    USER_STORE,
    TODO_STORE
  };
  app.listen(port);
};

main();
