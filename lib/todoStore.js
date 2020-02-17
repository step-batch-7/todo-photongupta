const TodoLists = require('./todoLists');

class TodoStore {
  constructor(path, writer) {
    this.path = path;
    this.writer = writer;
    this.todoLists = {};
  }

  static initialize(userTodos, path, writer) {
    const todoStore = new TodoStore(path, writer);
    for (const key in userTodos) {
      todoStore.todoLists[key] = TodoLists.load(userTodos[key]);
    }
    return todoStore;
  }

  addTodo(todo, userName) {
    this.todoLists[userName].addTodo(todo);
    this.save();
  }

  getStatus(userName) {
    return this.todoLists[userName].getStatus();
  }

  createNewUserTodo(userName) {
    this.todoLists[userName] = new TodoLists();
    this.save();
  }

  save() {
    this.writer(this.path, JSON.stringify(this.todoLists));
  }

  addItem(item, todoId, userName) {
    this.todoLists[userName].addItem(item, todoId);
    this.save();
  }

  deleteItem(itemId, todoId, userName) {
    this.todoLists[userName].deleteItem(itemId, todoId);
    this.save();
  }

  deleteTodo(todoId, userName) {
    this.todoLists[userName].deleteTodo(todoId);
    this.save();
  }

  toggleStatus(todoId, taskId, userName) {
    this.todoLists[userName].toggleStatus(todoId, taskId);
    this.save();
  }

  editTask(taskId, newTask, todoId, userName) {
    this.todoLists[userName].editTask(taskId, newTask, todoId);
    this.save();
  }

  editTitle(todoId, newTitle, userName) {
    this.todoLists[userName].editTitle(todoId, newTitle);
    this.save();
  }
}

module.exports = TodoStore;
