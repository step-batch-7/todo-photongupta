const App = require('./app');
const handlers = require('./handlers');

const app = new App();

app.use(handlers.readBody);
app.use(handlers.parseBody);
app.get('/todoList.json', handlers.serveDataBase);
app.get('', handlers.serveStaticFile);
app.get('', handlers.notFound);
app.post('/updateStatus', handlers.updateStatus);
app.post('/deleteItem', handlers.deleteItem);
app.post('/deleteTodo', handlers.deleteTodo);
app.post('/home.html', handlers.addTodo);
app.post('/editTitle', handlers.editTitle);
app.post('/editTask', handlers.editTask);
app.post('/addItem', handlers.addItem);
app.post('', handlers.badRequest);
app.post('', handlers.notFound);
app.use(handlers.methodNotAllowed);

module.exports = {app};
