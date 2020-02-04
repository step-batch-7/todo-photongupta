const {generateId} = require('./utils');

class Item {
  constructor(item, id) {
    this.id = id;
    this.isDone = false;
    this.item = item;
  }

  unTick() {
    this.isDone = false;
  }

  tick() {
    this.isDone = true;
  }

  hasId(ids) {
    return ids.includes(this.id);
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
    items.forEach(item => this.todoItems.push(new Item(item, generateId())));
  }

  updateIsDone(checkedItemIds) {
    this.todoItems.forEach(item => {
      item.unTick();
      if (item.hasId(checkedItemIds)) item.tick();
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
      newTodo.addItems(todo.todoItems);
      todoList.addTodo(newTodo);
    });
    return todoList;
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  changeToString() {
    return JSON.stringify(this.todoList);
  }

  updateIsDoneStatus(checkedItemIds, todoId) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.updateIsDone(checkedItemIds);
      }
    });
  }
}

module.exports = {Item, Todo, TodoList};
