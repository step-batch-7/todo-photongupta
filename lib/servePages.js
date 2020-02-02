const fs = require('fs');
const {CONTENT_TYPES} = require('./mimeTypes');
const todoHistory = require('/Users/step29/my_work/html/todoApp/lib/../dataBase/todoList.json');
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 400;
const querystring = require('querystring');
const {allTodo, titles} = require('../template/template');
const {allReplace} = require('./utils');

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

const parseBody = function(req) {
  req.body = '';
  req.on('data', text => {
    req.body += text;
  });
};

const addTodo = function(req, res, next) {
  parseBody(req);
  req.on('end', () => {
    const newTodo = querystring.parse(req.body);
    todoList = new Array(newTodo.todoList).flat();
    newTodo.todoList = todoList.map(todo => {
      return {item: todo, isDone: false};
    });
    newTodo.id = Math.random();
    todoHistory.unshift(newTodo);
    const content = JSON.stringify(todoHistory);
    fs.writeFileSync(
      '/Users/step29/my_work/html/todoApp/lib/../dataBase/todoList.json',
      content,
      'utf8'
    );
    res.setHeader('Location', '/index.html');
    res.statusCode = 302;
    res.end();
  });
};

const serveDataBase = function(req, res, next) {
  const content = JSON.stringify(todoHistory);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const serveShowPage = function(req, res) {
  console.log(allReplace);
  const allTitlesInHtml = todoHistory
    .map(todo => allReplace(titles, {__title__: todo.title, __id__: todo.id}))
    .join('');
  const content = allTodo.replace('__todo__', allTitlesInHtml);
  const response = getResponse(req.url, content, res);
  response.end(content);
};

const serveStaticFile = function(req, res, next) {
  if (req.url === '/showList.html') {
    res.end('bad');
  }
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
  serveShowPage,
  serveDataBase,
  methodNotAllowed
};
