const express = require('express');
const app = express();

const {
  addTodo,
  addItem,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  serveDataBase,
  updateStatus
} = require('./handlers');

const hasFields = (...fields) => {
  return (req, res, next) => {
    if (fields.every(field => field in req.body)) {
      return next();
    }
    res.statusCode = 400;
    res.end('bad Request'); // use built in http status code message
  };
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/todoList.json', serveDataBase);
app.use(express.static('public'));
app.post('/home.html', addTodo);
app.post('/updateStatus', hasFields('todoId', 'ids'), updateStatus);
app.post('/deleteItem', hasFields('todoId', 'itemId'), deleteItem);
app.post('/deleteTodo', hasFields('todoId'), deleteTodo);
app.post('/editTitle', hasFields('todoId', 'newTitle'), editTitle);
app.post('/editTask', hasFields('todoId', 'taskId', 'newTask'), editTask);
app.post('/addItem', hasFields('item', 'todoId'), addItem);

module.exports = {app};
