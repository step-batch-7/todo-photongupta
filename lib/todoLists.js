const {Todo, findItem} = require('./todo');

class TodoLists {
  constructor() {
    this.todoList = [];
  }

  static load(content) {
    const allTodo = JSON.parse(content || '[]');
    const todoList = new TodoLists();
    allTodo.forEach(todo => {
      const newTodo = new Todo(todo);
      newTodo.modifyItemList(todo.todoItems);
      todoList.addTodo(newTodo);
    });
    return todoList;
  }

  addItem(item, todoId) {
    const todo = findItem(todoId, this.todoList);
    todo.addItems([item]);
  }

  addTodo(todo) {
    this.todoList.push(todo);
    return this.TodoList;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.todoList));
  }

  deleteItem(itemId, todoId) {
    const todo = findItem(todoId, this.todoList);
    todo.removeItem(itemId);
  }

  deleteTodo(todoId) {
    const todo = findItem(todoId, this.todoList);
    const todoIndex = this.todoList.indexOf(todo);
    delete this.todoList[todoIndex];
    this.todoList = this.todoList.filter(todo => todo);
  }

  editTitle(todoId, newTitle) {
    const todo = findItem(todoId, this.todoList);
    todo.editTitle(newTitle);
  }

  editTask(itemId, newTask, todoId) {
    const todo = findItem(todoId, this.todoList);
    todo.editTask(newTask, itemId);
  }

  updateIsDoneStatus(checkedItemIds, todoId) {
    const todo = findItem(todoId, this.todoList);
    todo.updateStatus(checkedItemIds);
  }
}

module.exports = TodoLists;
