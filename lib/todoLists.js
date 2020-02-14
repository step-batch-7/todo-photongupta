const {Todo} = require('./todo');

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

  onTodo(todoId, operation) {
    const todo = this.todoList.find(todo => todo.id === +todoId);
    return todo && operation(todo);
  }

  addItem(item, todoId) {
    return this.onTodo(todoId, todo => {
      return todo.addItems([item]);
    });
  }

  addTodo(todo) {
    this.todoList.push(todo);
    return this.todoList.length;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.todoList));
  }

  deleteItem(itemId, todoId) {
    return this.onTodo(todoId, todo => todo.removeItem(itemId));
  }

  deleteTodo(todoId) {
    return this.onTodo(todoId, todo => {
      const todoIndex = this.todoList.indexOf(todo);
      delete this.todoList[todoIndex];
      return (this.todoList = this.todoList.filter(todo => todo));
    });
  }

  editTitle(todoId, newTitle) {
    return this.onTodo(todoId, todo => todo.editTitle(newTitle));
  }

  editTask(itemId, newTask, todoId) {
    return this.onTodo(todoId, todo => todo.editTask(newTask, itemId));
  }

  updateIsDoneStatus(checkedItemIds, todoId) {
    return this.onTodo(todoId, todo => todo.updateStatus(checkedItemIds));
  }
}

module.exports = TodoLists;
