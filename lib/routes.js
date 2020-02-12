const App = require('./app');
const {
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
  serveDataBase,
  methodNotAllowed,
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

const app = new App();

app.use(readBody);
app.use(parseBody);
app.get('/todoList.json', serveDataBase);
app.get('', serveStaticFile);
app.get('', notFound);
app.post('/home.html', addTodo);
app.post('/updateStatus', hasFields('todoId', 'ids'), updateStatus);
app.post('/deleteItem', hasFields('todoId', 'itemId'), deleteItem);
app.post('/deleteTodo', hasFields('todoId'), deleteTodo);
app.post('/editTitle', hasFields('todoId', 'newTitle'), editTitle);
app.post('/editTask', hasFields('todoId', 'taskId', 'newTask'), editTask);
app.post('/addItem', hasFields('item', 'todoId'), addItem);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
