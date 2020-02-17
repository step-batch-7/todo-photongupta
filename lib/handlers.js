const attachDetails = function(req, res, next) {
  const {todoStore, userStore} = req.app.locals;
  req.todoStore = todoStore;
  req.userStore = userStore;
  req.userName = req.userStore.getUserName(req.cookies.sessionId);
  next();
};

const registerUser = function(req, res) {
  const {userName, password, email, phone} = req.body;
  const credentials = {password, email, phone};
  req.userStore.addNewUser(userName, credentials);
  req.todoStore.createNewUserTodo(userName);
  res.setHeader('Location', '/');
  res.statusCode = 302;
  res.send();
};

const validateUserExists = function(req, res) {
  const {userName} = req.body;
  if (req.userStore.isUserPresent(userName)) {
    return res.send(true);
  }
  res.send(false);
};

const validateLogin = function(req, res) {
  const {userName, password} = req.body;
  if (req.userStore.isValidLogin(userName, password)) {
    const sessionId = req.userStore.createNewSession(userName);
    res.cookie('sessionId', sessionId);
    return res.send(true);
  }
  res.send(false);
};

const logOut = function(req, res) {
  req.userStore.logOut(req.userName);
  res.clearCookie('sessionId');
  res.setHeader('Location', '/');
  res.statusCode = 302;
  res.send();
};

const editTitle = function(req, res) {
  const {todoId, newTitle} = req.body;
  req.todoStore.editTitle(todoId, newTitle, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const editTask = function(req, res) {
  const {taskId, newTask, todoId} = req.body;
  req.todoStore.editTask(taskId, newTask, todoId, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const deleteTodo = function(req, res) {
  const {todoId} = req.body;
  req.todoStore.deleteTodo(todoId, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const deleteItem = function(req, res) {
  const {itemId, todoId} = req.body;
  req.todoStore.deleteItem(itemId, todoId, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const updateStatus = function(req, res) {
  const {todoId, taskId} = req.body;
  req.todoStore.toggleStatus(todoId, taskId, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const addTodo = function(req, res) {
  const todo = req.body;
  req.todoStore.addTodo(todo, req.userName);
  res.setHeader('Location', '/home.html');
  res.statusCode = 302;
  res.end();
};

const addItem = function(req, res) {
  const {item, todoId} = req.body;
  req.todoStore.addItem(item, todoId, req.userName);
  res.json(req.todoStore.toJSON(req.userName));
};

const serveDataBase = function(req, res) {
  const todoLists = req.todoStore.toJSON(req.userName);
  res.json(todoLists);
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
  attachDetails,
  logOut
};
