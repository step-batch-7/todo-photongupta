const App = require('./app');
const {
  serveStaticFile,
  addTodo,
  addItem,
  notFound,
  showTodoList,
  updateStatus,
  serveDataBase,
  parseBody,
  deleteItem,
  deleteTodo,
  editTitle,
  methodNotAllowed
} = require('./servePages');

const app = new App();

app.use(parseBody);
app.get('/todoList.json', serveDataBase);
app.get('/showList.html', showTodoList);
app.get('/', serveStaticFile);
app.get('', notFound);
app.post('/updateStatus', updateStatus);
app.post('/deleteItem', deleteItem);
app.post('/deleteTodo', deleteTodo);
app.post('/showList.html', addTodo);
app.post('/addTodo.html', addTodo);
app.post('/editTitle', editTitle);

app.post('/addItem', addItem);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
