const assert = require('chai').assert;
const TodoLists = require('../lib/todoLists');
const {Todo} = require('../lib/todo');

describe('TodoLists', function() {
  describe('addItem', function() {
    it('should add the item when todo is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.strictEqual(todoList.addItem('homeWork', 1), 1);
    });

    it('should give falsy value when todo is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.isUndefined(todoList.addItem('homeWork', 55));
    });
  });

  describe('addTodo', function() {
    it('should add the Todo', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      assert.strictEqual(todoList.addTodo(todo), 1);
    });
  });

  describe('toJSON', function() {
    it('should parse the class instance', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.toJSON(), [
        {title: 'maths', id: 1, todoItems: []}
      ]);
    });
  });

  describe('deleteItem', function() {
    it('should delete the item when todo is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['do homeworks']);
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.deleteItem(1, 1), []);
    });

    it('should give falsy value when todo is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.isUndefined(todoList.deleteItem('homeWork', 55));
    });
  });

  describe('deleteTodo', function() {
    it('should delete the item when todo is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.deleteTodo(1), []);
    });

    it('should give falsy value when todo is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.isUndefined(todoList.deleteTodo(55));
    });
  });

  describe('editTitle', function() {
    it('should rename the todo when todo is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.editTitle(1, 'english'), 'english');
    });

    it('should give falsy value when todo is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todoList.addTodo(todo);
      assert.isUndefined(todoList.editTitle(55, 'english'));
    });
  });

  describe('editTask', function() {
    it('should rename the item when todo and task is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['hello']);
      todoList.addTodo(todo);
      assert.deepStrictEqual(todoList.editTask(1, 'english', 1), 'english');
    });

    it('should give falsy value when todo or task is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['hello']);
      todoList.addTodo(todo);
      assert.isUndefined(todoList.editTask(55, 'english', 4));
    });
  });

  describe('updateIsDoneStatus', function() {
    it('should rename the item when todo and task is present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['hello']);
      todoList.addTodo(todo);
      assert.isTrue(todoList.updateIsDoneStatus([1], 1));
    });

    it('should give falsy value when todo or task is not present', function() {
      const todoList = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['hello']);
      todoList.addTodo(todo);
      assert.isUndefined(todoList.updateIsDoneStatus([55], 4));
    });
  });

  describe('static load', function() {
    it('should give the instance of todoLists class', function() {
      const todoLists = new TodoLists();
      const todo = new Todo({title: 'maths', id: 1});
      todo.addItems(['homework']);
      todoLists.addTodo(todo);
      assert.instanceOf(
        TodoLists.load(
          JSON.stringify([
            {
              title: 'maths',
              id: 1,
              todoItems: [{item: 'homework', id: 1, isDone: false}]
            }
          ])
        ),
        TodoLists
      );
    });

    it('should give the instance of todoLists class when the content is not given', function() {
      assert.instanceOf(TodoLists.load(), TodoLists);
    });
  });
});
