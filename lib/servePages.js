const fs = require('fs');
const querystring = require('querystring');
const {CONTENT_TYPES} = require('./mimeTypes');
const todoHistory = require('/Users/step29/my_work/html/todoApp/lib/../dataBase/todoList.json');
const {allTodo, titles} = require('../template/template');
const {allReplace} = require('./utils');
const Todo = require('./Todo');

const DATA_BASE =
  '/Users/step29/my_work/html/todoApp/lib/../dataBase/todoList.json';

const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 400;

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

const addToDataBase = function(newTodo) {
  todoHistory.unshift(newTodo);
  const content = JSON.stringify(todoHistory);
  fs.writeFileSync(DATA_BASE, content, 'utf8');
};

const parseBody = function(req) {
  req.body = '';
  req.on('data', text => {
    req.body += text;
  });
};

const addTodo = function(req, res) {
  parseBody(req);
  req.on('end', () => {
    const newTodo = new Todo(querystring.parse(req.body));
    newTodo.addIdToItems();
    addToDataBase(newTodo);
    res.setHeader('Location', '/index.html');
    res.statusCode = 302;
    res.end();
  });
};

const serveDataBase = function(req, res) {
  const content = JSON.stringify(todoHistory);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const showTodoList = function(req, res) {
  const allTitlesInHtml = todoHistory
    .map(todo => allReplace(titles, {__title__: todo.title, __id__: todo.id}))
    .join('');
  const content = allTodo.replace('__todo__', allTitlesInHtml);
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
  methodNotAllowed
};
