const Item = require('./item');
const {generateId} = require('./utils');

const findItem = function(id, items) {
  return items.find(item => item.id === +id);
};

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = [];
  }

  hasSameId(id) {
    return this.id == id;
  }

  addItems(items) {
    items.forEach(item =>
      this.todoItems.push(new Item(item, generateId(), false))
    );
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }

  editTask(newTask, itemId) {
    const item = findItem(itemId, this.todoItems);
    item.editTask(newTask);
  }

  modifyItemList(todoItems) {
    todoItems.forEach(({item, id, isDone}) =>
      this.todoItems.push(new Item(item, id, isDone))
    );
  }

  removeItem(itemId) {
    const item = findItem(itemId, this.todoItems);
    const itemIndex = this.todoItems.indexOf(item);
    delete this.todoItems[itemIndex];
    this.todoItems = this.todoItems.filter(item => item);
  }

  updateStatus(checkedItemIds) {
    this.todoItems.forEach(item => {
      item.unTick();
      if (item.idIncludesIn(checkedItemIds)) item.tick();
    });
  }
}

module.exports = {Todo, findItem};
