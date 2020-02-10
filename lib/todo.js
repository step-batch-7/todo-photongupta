const Item = require('./item');
const {generateId} = require('./utils');

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = [];
  }

  hasSameId(id) {
    return this.id === +id;
  }

  addItems(items) {
    items.forEach(item =>
      this.todoItems.push(new Item(item, generateId(), false))
    );
  }

  editTitle(newTitle) {
    console.log('editTitle');
    this.title = newTitle;
  }

  editTask(newTask, itemId) {
    this.todoItems.forEach(item => {
      if (item.hasSameId(itemId)) {
        item.editTask(newTask);
      }
    });
  }

  modifyItemList(todoItems) {
    todoItems.forEach(({item, id, isDone}) =>
      this.todoItems.push(new Item(item, id, isDone))
    );
  }

  removeItem(itemId) {
    this.todoItems.forEach((item, index) => {
      if (item.hasSameId(itemId)) {
        delete this.todoItems[index];
      }
    });
    this.todoItems = this.todoItems.filter(item => item);
  }

  updateStatus(checkedItemIds) {
    this.todoItems.forEach(item => {
      item.unTick();
      if (item.idIncludesIn(checkedItemIds)) item.tick();
    });
  }
}

module.exports = Todo;
