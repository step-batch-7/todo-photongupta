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
}

class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = todo.todoItems;
  }

  hasSameId(id) {
    return this.id == id;
  }

  updateIsDone(checkedItemIds) {
    this.todoItems.forEach(item => {
      item.unTick();
      if (checkedItemIds.includes(item.id)) item.tick();
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
      todo.todoItems = todo.todoItems.map(item => item);
      todoList.addTodo(new Todo(todo));
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
