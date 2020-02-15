const fs = require('fs');
const {config} = require('../config');
const {DataStore} = require('./dataStore');
const USER_STORE = `${__dirname}/../dataBase/userCredentials.json`;
const userCredentials = require(USER_STORE);

const dataStore = new DataStore(config.path, fs.readFileSync, fs.writeFileSync);
dataStore.initialize();

const registerUser = function(req, res) {
  const {userName, password, email, phone} = req.body;
  const userDetails = {password, email, phone};
  userCredentials[userName] = userDetails;
  fs.writeFileSync(USER_STORE, JSON.stringify(userCredentials));
  res.setHeader('Location', '/');
  res.statusCode = 302;
  res.send();
};

const validateUserExists = function(req, res) {
  const {userName} = req.body;
  if (userCredentials[userName]) {
    return res.send(true);
  }
  res.send(false);
};

const validateLogin = function(req, res) {
  const {userName, password} = req.body;
  const user = userCredentials[userName];
  if (user && user.password === password) {
    res.cookie('cookieName', userName);
    return res.send(true);
  }
  res.send(false);
};

const editTitle = function(req, res) {
  const {todoId, newTitle} = req.body;
  dataStore.editTitle(todoId, newTitle);
  res.json(dataStore.toJSON());
};

const editTask = function(req, res) {
  const {taskId, newTask, todoId} = req.body;
  dataStore.editTask(taskId, newTask, todoId);
  res.json(dataStore.toJSON());
};

const deleteTodo = function(req, res) {
  const {todoId} = req.body;
  dataStore.deleteTodo(todoId);
  res.json(dataStore.toJSON());
};

const deleteItem = function(req, res) {
  const {itemId, todoId} = req.body;
  dataStore.deleteItem(itemId, todoId);
  res.json(dataStore.toJSON());
};

const updateStatus = function(req, res) {
  const {todoId, taskId} = req.body;
  dataStore.toggleStatus(todoId, taskId);
  res.json(dataStore.toJSON());
};

const addTodo = function(req, res) {
  const todo = req.body;
  dataStore.addTodo(todo);
  res.setHeader('Location', '/home.html');
  res.statusCode = 302;
  res.end();
};

const addItem = function(req, res) {
  const {item, todoId} = req.body;
  dataStore.addItem(item, todoId);
  res.json(dataStore.toJSON());
};

const serveDataBase = function(req, res) {
  res.json(dataStore.toJSON());
};

module.exports = {
  addTodo,
  addItem,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  serveDataBase,
  updateStatus,
  registerUser,
  validateUserExists,
  validateLogin
};
