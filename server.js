'use strict';

const {writeFileSync} = require('fs');
const TodoStore = require('./lib/todoStore');
const UserStore = require('./lib/userStore');
const USER_STORE = './dataBase/userCredentials.json';
const TODO_STORE = './dataBase/todoList.json';
const todoLists = require(TODO_STORE);
const userCredentials = require(USER_STORE);
const {app} = require('./lib/routes');

const defaultPort = 5000;

const main = function(port = defaultPort) {
  app.locals = {
    todoStore: TodoStore.initialize(todoLists, TODO_STORE, writeFileSync),
    writer: writeFileSync,
    userStore: UserStore.initialize(userCredentials, USER_STORE, writeFileSync)
  };
  app.listen(port);
};

main();
