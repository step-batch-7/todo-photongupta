const fs = require('fs');
const querystring = require('querystring');
const {CONTENT_TYPES} = require('./mimeTypes');
const {todoList, titles} = require('../template/template');
const {allReplace, generateId} = require('./utils');
const {Todo, TodoList} = require('./Todo');

const DATA_BASE = `${__dirname}/../dataBase/todoList.json`;
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

const fileNotPresent = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const updateDataBase = function(todoHistory) {
  const content = todoHistory.changeToString();
  fs.writeFileSync(DATA_BASE, content, 'utf8');
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

const toggleIsDoneStatus = function(ids, todoId) {
  const checkedItemIds = ids[0].split(',').map(id => +id);
  todoHistory.updateIsDoneStatus(checkedItemIds, todoId);
  updateDataBase(todoHistory);
};

const toggleStatus = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const targets = querystring.parse(req.body);
    const todoId = targets.todoId;
    const ids = new Array(targets.ids);
    toggleIsDoneStatus(ids, todoId);
    res.setHeader('Location', '/showList.html');
    res.statusCode = 302;
    res.end();
  });
};

const addTodo = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const newTodo = createNewTodo(req);
    todoHistory.addTodo(newTodo);
    updateDataBase(todoHistory);
    res.setHeader('Location', '/index.html');
    res.statusCode = 302;
    res.end();
  });
};

const showTodoList = function(req, res) {
  const titlesInHtml = todoHistory.todoList
    .map(todo => allReplace(titles, {__title__: todo.title, __id__: todo.id}))
    .join('');
  const content = todoList.replace('__todoList__', titlesInHtml);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const serveDataBase = function(req, res) {
  const content = todoHistory.changeToString();
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
  notFound,
  showTodoList,
  serveDataBase,
  methodNotAllowed,
  toggleStatus
};
