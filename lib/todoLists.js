const Todo = require('./todo');

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
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.addItems([item]);
      }
    });
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
        todo.removeItem(itemId);
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

  editTitle(todoId, newTitle) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.editTitle(newTitle);
      }
    });
  }

  editTask(itemId, newTask, todoId) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.editTask(newTask, itemId);
      }
    });
  }

  updateIsDoneStatus(checkedItemIds, todoId) {
    this.todoList.forEach(todo => {
      if (todo.hasSameId(todoId)) {
        todo.updateStatus(checkedItemIds);
      }
    });
  }
}

module.exports = TodoLists;
