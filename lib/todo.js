const Item = require('./item');

const generateId = function(list) {
  const lastElement = list[list.length - 1];
  const maxId = lastElement ? lastElement.id : 0;
  return maxId + 1;
};

const findItem = function(id, items) {
  return items.find(item => item.id === +id);
};

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = [];
  }

  addItems(items) {
    items.forEach(item =>
      this.todoItems.push(new Item(item, generateId(this.todoItems), false))
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
      if (item.idIncludesIn(checkedItemIds)) {
        item.tick();
      }
    });
  }
}

module.exports = {Todo, findItem, generateId};
