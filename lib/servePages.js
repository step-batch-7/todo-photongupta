const fs = require('fs');
const querystring = require('querystring');
const {config} = require('../config');
const {CONTENT_TYPES} = require('./mimeTypes');
const {todoList, titles} = require('../template/template');
const {
  allReplace,
  generateId,
  fileNotPresent,
  getLeftItems
} = require('./utils');
const {Todo, TodoList} = require('./Todo');

const DATA_BASE = config.path;
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 400;
const todoHistory = TodoList.load(fs.readFileSync(DATA_BASE, 'utf8'));

const getResponse = function(reqUrl, content, res) {
  const extension = reqUrl.split('.').pop();
  res.setHeader('Content-Type', CONTENT_TYPES[extension]);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  return res;
};

const updateDataBase = function(todoHistory) {
  const content = todoHistory.toJSON();
  fs.writeFileSync(DATA_BASE, content, 'utf8');
};

const updateAndRedirect = function(url, res, todoHistory) {
  updateDataBase(todoHistory);
  res.setHeader('Location', url);
  res.statusCode = 302;
  res.end();
};

const parseBody = function(req) {
  req.body = '';
  req.on('data', text => {
    req.body += text;
  });
};

const createNewTodo = function(req) {
  const todo = querystring.parse(req.body);
  todo.id = generateId();
  todo.todoItems = new Array(todo.todoItem).flat();
  const newTodo = new Todo(todo);
  newTodo.addItems(todo.todoItems);
  return newTodo;
};

const deleteTodo = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const {todoId} = querystring.parse(req.body);
    todoHistory.deleteTodo(todoId);
    updateAndRedirect('/showList', res, todoHistory);
  });
};

const deleteItem = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const {itemId, todoId} = querystring.parse(req.body);
    todoHistory.deleteItem(itemId, todoId);
    updateAndRedirect('/showList', res, todoHistory);
  });
};

const updateStatus = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const {todoId, ids} = querystring.parse(req.body);
    const checkedItemIds = new Array(ids)[0].split(',').map(id => +id);
    todoHistory.updateIsDoneStatus(checkedItemIds, todoId);
    updateAndRedirect('/showList', res, todoHistory);
  });
};

const addTodo = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const newTodo = createNewTodo(req);
    todoHistory.addTodo(newTodo);
    updateAndRedirect('/index.html', res, todoHistory);
  });
};

const addItem = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const {item, todoId} = querystring.parse(req.body);
    todoHistory.addItem(item, todoId);
    updateAndRedirect('/showList', res, todoHistory);
  });
};

const showTodoList = function(req, res) {
  const titlesInHtml = todoHistory.todoList
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
  console.log('hi');
  response.end(content);
};

const serveDataBase = function(req, res) {
  const content = todoHistory.toJSON();
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
  serveStaticFile,
  addTodo,
  addItem,
  deleteItem,
  deleteTodo,
  notFound,
  showTodoList,
  serveDataBase,
  methodNotAllowed,
  updateStatus
};
