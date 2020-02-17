const Item = require('./item');

const generateId = function(list) {
  const lastElement = list[list.length - 1];
  const maxId = lastElement ? lastElement.id : 0;
  return maxId + 1;
};

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = [];
  }

  static load(todo) {
    const newTodo = new Todo(todo);
    newTodo.todoItems.push(...todo.todoItems.map(item => Item.load(item)));
    return newTodo;
  }

  toJSON() {
    return {title: this.title, id: this.id, todoItems: this.todoItems};
  }

  getStatus() {
    const todoItems = this.todoItems.map(item => item.getStatus());
    return {todoItems, title: this.title, id: this.id};
  }

  onTask(taskId, operation) {
    const task = this.todoItems.find(task => task.id === +taskId);
    return task && operation(task);
  }

  editTask(newTaskName, taskId) {
    return this.onTask(taskId, task => {
      return task.editTask(newTaskName);
    });
  }

  addItems(items) {
    items.forEach(item => {
      if (item) {
        this.todoItems.push(new Item(item, generateId(this.todoItems), false));
      }
    });
    return this.todoItems.length;
  }

  editTitle(newTitle) {
    this.title = newTitle;
    return this.title;
  }

  removeItem(taskId) {
    return this.onTask(taskId, task => {
      const itemIndex = this.todoItems.indexOf(task);
      delete this.todoItems[itemIndex];
      return (this.todoItems = this.todoItems.filter(task => task));
    });
  }

  toggleStatus(taskId) {
    return this.onTask(taskId, task => {
      return task.toggleStatus();
    });
  }
}

module.exports = {Todo, generateId};
