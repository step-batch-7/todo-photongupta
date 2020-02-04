class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.todoItems = todo.todoItems;
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
}

module.exports = {Todo, TodoList};
