const todoItem = require('./todoItem');

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = new Date();
    this.todoItems = new Array(todo.todoItem).flat();
  }

  addIdToItems() {
    this.todoItems = this.todoItems.map(item => new todoItem(item));
  }
}

module.exports = Todo;
