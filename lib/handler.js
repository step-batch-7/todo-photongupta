const App = require('./app');
const {
  serveStaticFile,
  addTodo,
  notFound,
  showTodoList,
  toggleStatus,
  serveDataBase,
  methodNotAllowed
} = require('./servePages');

const app = new App();

app.get('/todoList.json', serveDataBase);
app.get('/showList.html', showTodoList);
app.get('/', serveStaticFile);
app.get('', notFound);
app.post('/showList.html', toggleStatus);

app.post('/add.html', addTodo);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
