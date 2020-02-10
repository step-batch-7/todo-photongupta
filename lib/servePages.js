const fs = require('fs');
const querystring = require('querystring');
const {config} = require('../config');
const {CONTENT_TYPES} = require('./mimeTypes');
const {todoList, titles} = require('../template/template');
const {allReplace, fileNotPresent, getLeftItems} = require('./utils');
const {DataStore} = require('./dataStore');

const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 400;
const dataStore = new DataStore(config.path);
dataStore.initialize();

const getResponse = function(reqUrl, content, res) {
  const extension = reqUrl.split('.').pop();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  return res;
};

const parseBody = function(req, res, next) {
  req.body = querystring.parse(req.body);
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
  res.end();
};

const editTask = function(req, res) {
  const {taskId, newTask, todoId} = req.body;
  dataStore.editTask(taskId, newTask, todoId);
  res.end();
};

const deleteTodo = function(req, res) {
  const {todoId} = req.body;
  dataStore.deleteTodo(todoId);
  res.end();
};

const deleteItem = function(req, res) {
  const {itemId, todoId} = req.body;
  dataStore.deleteItem(itemId, todoId);
  res.end();
};

const updateStatus = function(req, res) {
  const {todoId, ids} = req.body;
  const checkedItemIds = new Array(ids)[0].split(',').map(id => +id);
  dataStore.toggleStatus(checkedItemIds, todoId);
  res.end();
};

const addTodo = function(req, res) {
  const todo = req.body;
  dataStore.addTodo(todo);
  res.setHeader('Location', '/showList.html');
  res.statusCode = 302;
  res.end();
};

const addItem = function(req, res) {
  const {item, todoId} = req.body;
  dataStore.addItem(item, todoId);
  res.end();
};

const showTodoList = function(req, res) {
  const titlesInHtml = dataStore.todoList
    .map(todo => {
      return allReplace(titles, {
        __title__: todo.title,
        __id__: todo.id,
        __left__: getLeftItems(todo)
      });
    })
    .join('');
  const content = todoList.replace('__todoList__', titlesInHtml);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const serveDataBase = function(req, res) {
  const content = dataStore.toJSON();
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const serveStaticFile = function(req, res, next) {
  req.url = req.url === '/' ? '/index.html' : req.url;
  const path = `${__dirname}/../public${req.url}`;
  if (fileNotPresent(path)) {
    next();
    return;
  }
  const content = fs.readFileSync(path);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const notFound = function(req, res) {
  res.writeHead(NOT_FOUND);
  res.end('Not Found');
};

const methodNotAllowed = function(req, res) {
  res.writeHead(METHOD_NOT_ALLOWED);
  res.end('Method Not Allowed');
};

module.exports = {
  parseBody,
  serveStaticFile,
  addTodo,
  addItem,
  readBody,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  notFound,
  showTodoList,
  serveDataBase,
  methodNotAllowed,
  updateStatus
};
