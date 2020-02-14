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
    items.forEach(item =>
      this.todoItems.push(new Item(item, generateId(this.todoItems), false))
    );
    return this.todoItems.length;
  }

  editTitle(newTitle) {
    this.title = newTitle;
    return this.title;
  }

  modifyItemList(todoItems) {
    todoItems.forEach(({item, id, isDone}) =>
      this.todoItems.push(new Item(item, id, isDone))
    );
    return this.todoItems.length;
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
