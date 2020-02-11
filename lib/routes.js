const App = require('./app');
const {
  serveStaticFile,
  addTodo,
  addItem,
  notFound,
  updateStatus,
  serveDataBase,
  parseBody,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  readBody,
  badRequest,
  methodNotAllowed
} = require('./handlers');

const app = new App();

app.use(readBody);
app.use(parseBody);
app.get('/todoList.json', serveDataBase);
app.get('', serveStaticFile);
app.get('', notFound);
app.post('/updateStatus', updateStatus);
app.post('/deleteItem', deleteItem);
app.post('/deleteTodo', deleteTodo);
app.post('/home.html', addTodo);
app.post('/editTitle', editTitle);
app.post('/editTask', editTask);
app.post('/addItem', addItem);
app.post('', badRequest);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
