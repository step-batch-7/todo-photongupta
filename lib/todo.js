const {generateId} = require('./utils');

class Item {
  constructor(item, id, status) {
    this.id = id;
    this.isDone = status;
    this.item = item;
  }

  unTick() {
    this.isDone = false;
  }

  tick() {
    this.isDone = true;
  }

  idIncludesIn(ids) {
    return ids.includes(this.id);
  }

  hasSameId(id) {
    return this.id == id;
  }
}

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

  modifyItemList(todoItems) {
    todoItems.forEach(({item, id, isDone}) =>
      this.todoItems.push(new Item(item, id, isDone))
    );
  }

  updateItemList(itemId) {
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

class TodoList {
  constructor() {
    this.todoList = [];
  }

  static load(content) {
    const allTodo = JSON.parse(content || '[]');
    const todoList = new TodoList();
    allTodo.forEach(todo => {
      const newTodo = new Todo(todo);
      newTodo.modifyItemList(todo.todoItems);
      todoList.addTodo(newTodo);
    });
    return todoList;
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  toJSON() {
    return JSON.stringify(this.todoList);
  }

  deleteItem(itemId, todoId) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.updateItemList(itemId);
      }
    });
  }

  deleteTodo(todoId) {
    this.todoList.forEach((todo, index) => {
      if (todo.hasSameId(todoId)) {
        delete this.todoList[index];
      }
    });
    this.todoList = this.todoList.filter(todo => todo);
  }

  updateIsDoneStatus(checkedItemIds, todoId) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.updateStatus(checkedItemIds);
      }
    });
  }
}

module.exports = {Item, Todo, TodoList};
