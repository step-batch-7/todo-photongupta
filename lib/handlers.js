const fs = require('fs');
const querystring = require('querystring');
const {config} = require('../config');
const {DataStore} = require('./dataStore');

const dataStore = new DataStore(config.path, fs.readFileSync, fs.writeFileSync);
dataStore.initialize();

const parseBody = function(req, res, next) {
  const contentType = req.headers['content-type'];
  if (contentType === 'application/x-www-form-urlencoded') {
    req.body = querystring.parse(req.body);
  }
  if (contentType === 'application/json') {
    req.body = JSON.parse(req.body);
  }
  next();
};

const readBody = function(req, res, next) {
  let content = '';
  req.on('data', text => {
    content += text;
  });
  req.on('end', () => {
    if (content) {
      req.body = content;
    }
    next();
  });
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
  const {todoId, ids} = req.body;
  const checkedItemIds = ids.map(id => +id);
  dataStore.toggleStatus(checkedItemIds, todoId);
  res.end();
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
  parseBody,
  addTodo,
  addItem,
  readBody,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  serveDataBase,
  updateStatus
};
