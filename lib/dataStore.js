const fs = require('fs');
const {generateId} = require('./utils');
const {TodoList, Todo} = require('./Todo');

const initTodo = function(todo) {
  todo.id = generateId();
  todo.todoItems = new Array(todo.todoItem).flat();
  const newTodo = new Todo(todo);
  newTodo.addItems(todo.todoItems);
  return newTodo;
};

class DataStore {
  constructor(filePath) {
    this.filePath = filePath;
  }
  initialize() {
    this.todoLists = TodoList.load(fs.readFileSync(this.filePath, 'utf8'));
  }
  get todoList() {
    return this.todoLists.todoList;
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
    this.todoLists.addTodo(initTodo(todo));
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
    console.log('datta');

    this.todoLists.editTask(taskId, newTask, todoId);
    this.save();
  }

  editTitle(todoId, newTitle) {
    this.todoLists.editTitle(todoId, newTitle);
    this.save();
  }
  save() {
    const content = JSON.stringify(this.todoLists.todoList);
    fs.writeFileSync(this.filePath, content);
  }
}

module.exports = {DataStore};
