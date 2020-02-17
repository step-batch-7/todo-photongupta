const {Todo, generateId} = require('./todo');

const initTodo = function(todo, todoLists) {
  todo.id = generateId(todoLists);
  const todoItems = Array(todo.todoItem).flat();
  const newTodo = new Todo(todo);
  newTodo.addItems(todoItems);
  return newTodo;
};

class TodoLists {
  constructor() {
    this.todoList = [];
  }

  static load(allTodo) {
    const todoLists = new TodoLists();
    allTodo.forEach(todo => todoLists.todoList.push(Todo.load(todo)));
    return todoLists;
  }

  toJSON() {
    return this.todoList.slice();
  }

  getStatus() {
    return this.todoList.map(todo => todo.getStatus());
  }

  onTodo(todoId, operation) {
    const todo = this.todoList.find(todo => todo.id === +todoId);
    return todo && operation(todo);
  }

  addItem(item, todoId) {
    return this.onTodo(todoId, todo => {
      return todo.addItems([item]);
    });
  }

  addTodo(todo) {
    this.todoList.push(initTodo(todo, this.todoList));
    return this.todoList.length;
  }

  deleteItem(itemId, todoId) {
    return this.onTodo(todoId, todo => todo.removeItem(itemId));
  }

  deleteTodo(todoId) {
    return this.onTodo(todoId, todo => {
      const todoIndex = this.todoList.indexOf(todo);
      delete this.todoList[todoIndex];
      return (this.todoList = this.todoList.filter(todo => todo));
    });
  }

  editTitle(todoId, newTitle) {
    return this.onTodo(todoId, todo => todo.editTitle(newTitle));
  }

  editTask(itemId, newTask, todoId) {
    return this.onTodo(todoId, todo => todo.editTask(newTask, itemId));
  }

  toggleStatus(todoId, taskId) {
    return this.onTodo(todoId, todo => todo.toggleStatus(taskId));
  }
}

module.exports = TodoLists;
