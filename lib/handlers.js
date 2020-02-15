const attachDetails = function(req, res, next) {
  const {writer, todoLists, userCredentials} = req.app.locals;
  req.todoLists = todoLists;
  req.writer = writer;
  req.userCredentials = userCredentials;
  req.TODO_STORE = req.app.locals.TODO_STORE;
  req.USER_STORE = req.app.locals.USER_STORE;
  next();
};

const registerUser = function(req, res) {
  const {userName, password, email, phone} = req.body;
  const userDetails = {password, email, phone};
  req.userCredentials[userName] = userDetails;
  req.writer(req.USER_STORE, JSON.stringify(req.userCredentials));
  res.setHeader('Location', '/');
  res.statusCode = 302;
  res.send();
};

const validateUserExists = function(req, res) {
  const {userName} = req.body;
  if (req.userCredentials[userName]) {
    return res.send(true);
  }
  res.send(false);
};

const validateLogin = function(req, res) {
  const {userName, password} = req.body;
  const user = req.userCredentials[userName];
  if (user && user.password === password) {
    res.cookie('cookieName', userName);
    return res.send(true);
  }
  res.send(false);
};

const editTitle = function(req, res) {
  const {todoId, newTitle} = req.body;
  req.todoLists.editTitle(todoId, newTitle);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const editTask = function(req, res) {
  const {taskId, newTask, todoId} = req.body;
  req.todoLists.editTask(taskId, newTask, todoId);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const deleteTodo = function(req, res) {
  const {todoId} = req.body;
  req.todoLists.deleteTodo(todoId);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const deleteItem = function(req, res) {
  const {itemId, todoId} = req.body;
  req.todoLists.deleteItem(itemId, todoId);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const updateStatus = function(req, res) {
  const {todoId, taskId} = req.body;
  req.todoLists.toggleStatus(todoId, taskId);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const addTodo = function(req, res) {
  const todo = req.body;
  req.todoLists.addTodo(todo);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.setHeader('Location', '/home.html');
  res.statusCode = 302;
  res.end();
};

const addItem = function(req, res) {
  const {item, todoId} = req.body;
  req.todoLists.addItem(item, todoId);
  req.writer(req.TODO_STORE, JSON.stringify(req.todoLists));
  res.json(req.todoLists.toJSON());
};

const serveDataBase = function(req, res) {
  res.json(req.todoLists.toJSON());
};

module.exports = {
  addTodo,
  addItem,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  serveDataBase,
  updateStatus,
  registerUser,
  validateUserExists,
  validateLogin,
  attachDetails
};
