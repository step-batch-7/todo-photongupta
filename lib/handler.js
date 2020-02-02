const App = require('./app');
const {
  serveStaticFile,
  addTodo,
  notFound,
  serveShowPage,
  serveDataBase,
  methodNotAllowed
} = require('./servePages');

const app = new App();

app.get('/todoList.json', serveDataBase);
app.get('/showList.html', serveShowPage);
app.get('/', serveStaticFile);
app.get('', notFound);
app.post('/add.html', addTodo);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
