const App = require('./app');
const {
  serveStaticFile,
  addTodo,
  notFound,
  showTodoList,
  updateStatus,
  serveDataBase,
  deleteItem,
  deleteTodo,
  methodNotAllowed
} = require('./servePages');

const app = new App();

app.get('/todoList.json', serveDataBase);
app.get('/showList.html', showTodoList);
app.get('/', serveStaticFile);
app.get('', notFound);
app.post('/updateStatus', updateStatus);
app.post('/deleteItem', deleteItem);
app.post('/deleteTodo', deleteTodo);
app.post('/add.html', addTodo);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
