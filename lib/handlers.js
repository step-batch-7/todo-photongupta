const fs = require('fs');
const querystring = require('querystring');
const {config} = require('../config');
const {CONTENT_TYPES} = require('./mimeTypes');
const {DataStore} = require('./dataStore');

const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;
const BAD_REQUEST = 400;
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

const editTitle = function(req, res, next) {
  const {todoId, newTitle} = req.body;
  if (!todoId || !newTitle) {
    req.isBadRequest = true;
    next();
  }
  dataStore.editTitle(todoId, newTitle);
  res.setHeader('Content-Type', CONTENT_TYPES.json);
  res.end(dataStore.toJSON());
};

const editTask = function(req, res, next) {
  const {taskId, newTask, todoId} = req.body;
  if (!todoId || !newTask || !taskId) {
    req.isBadRequest = true;
    next();
  }
  dataStore.editTask(taskId, newTask, todoId);
  res.setHeader('Content-Type', CONTENT_TYPES.json);
  res.end(dataStore.toJSON());
};

const deleteTodo = function(req, res, next) {
  const {todoId} = req.body;
  if (!todoId) {
    req.isBadRequest = true;
    next();
  }
  dataStore.deleteTodo(todoId);
  res.setHeader('Content-Type', CONTENT_TYPES.json);
  res.end(dataStore.toJSON());
};

const deleteItem = function(req, res, next) {
  const {itemId, todoId} = req.body;
  if (!todoId || !itemId) {
    req.isBadRequest = true;
    next();
  }
  dataStore.deleteItem(itemId, todoId);
  res.setHeader('Content-Type', CONTENT_TYPES.json);
  res.end(dataStore.toJSON());
};

const updateStatus = function(req, res, next) {
  const {todoId, ids} = req.body;
  if (!todoId || !ids) {
    req.isBadRequest = true;
    next();
  }
  const checkedItemIds = ids.map(id => +id);
  dataStore.toggleStatus(checkedItemIds, todoId);
  res.end();
};

const addTodo = function(req, res, next) {
  const todo = req.body;
  if (!todo) {
    req.isBadRequest = true;
    next();
  }
  dataStore.addTodo(todo);
  res.setHeader('Location', '/home.html');
  res.statusCode = 302;
  res.end(dataStore.toJSON());
};

const addItem = function(req, res, next) {
  const {item, todoId} = req.body;
  if (!todoId || !item) {
    req.isBadRequest = true;
    next();
  }
  dataStore.addItem(item, todoId);
  res.sendResponse(dataStore.toJSON());
};

const serveDataBase = function(req, res) {
  const content = dataStore.toJSON();
  const response = getResponse(req.url, content, res);
  res.setHeader('Content-Type', CONTENT_TYPES.json);
  response.end(content);
};

const fileNotPresent = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
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

const badRequest = function(req, res, next) {
  if (!req.isBadRequest) {
    next();
  }
  res.writeHead(BAD_REQUEST);
  res.end('Bad Request');
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
  badRequest,
  serveDataBase,
  methodNotAllowed,
  updateStatus
};
