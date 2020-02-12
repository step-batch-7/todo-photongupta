const fs = require('fs');
const TodoLists = require('./todoLists');
const {Todo, generateId} = require('./todo');

const initTodo = function(todo, todoLists) {
  todo.id = generateId(todoLists);
  todo.todoItems = new Array(todo.todoItem).flat();
  const newTodo = new Todo(todo);
  newTodo.addItems(todo.todoItems);
  return newTodo;
};

class DataStore {
  constructor(filePath, reader, writer) {
    this.filePath = filePath;
    this.reader = reader;
    this.writer = writer;
  }
  initialize() {
    this.todoLists = TodoLists.load(this.reader(this.filePath, 'utf8'));
  }

  toJSON() {
    return this.todoLists.toJSON();
  }
  addItem(item, todoId) {
    this.todoLists.addItem(item, todoId);
    this.save();
  }
  deleteItem(itemID, todoId) {
    this.todoLists.deleteItem(itemID, todoId);
    this.save();
  }
  addTodo(todo) {
    this.todoLists.addTodo(initTodo(todo, this.todoLists.todoList));
    this.save();
  }
  deleteTodo(todoId) {
    this.todoLists.deleteTodo(todoId);
    this.save();
  }
  toggleStatus(checkedItemIds, todoId) {
    this.todoLists.updateIsDoneStatus(checkedItemIds, todoId);
    this.save();
  }

  editTask(taskId, newTask, todoId) {
    this.todoLists.editTask(taskId, newTask, todoId);
    this.save();
  }

  editTitle(todoId, newTitle) {
    this.todoLists.editTitle(todoId, newTitle);
    this.save();
  }
  save() {
    const content = JSON.stringify(this.todoLists.todoList);
    this.writer(this.filePath, content);
  }
}

module.exports = {DataStore};
