const assert = require('chai').assert;
const {Todo} = require('../lib/todo');

describe('Todo', function() {
  describe('addItems', function() {
    it('should add the given items into the todoItems', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      assert.strictEqual(todo.addItems(['maths', 'english']), 2);
    });
  });

  describe('editTitle', function() {
    it('should change the existing title', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      assert.strictEqual(todo.editTitle('classWork'), 'classWork');
    });
  });

  describe('toggleStatus', function() {
    it('should give true when the item is present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isTrue(todo.toggleStatus(1));
    });

    it('should give false when the item is not present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isUndefined(todo.toggleStatus(2));
    });
  });

  describe('editTask', function() {
    it('should edit the task when  the task is present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.strictEqual(todo.editTask('english', 1), 'english');
    });

    it('should give falsy value when  the task is not present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isUndefined(todo.editTask('english', 4));
    });
  });

  describe('removeItem', function() {
    it('should remove the task when  the task is present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.deepStrictEqual(todo.removeItem(1), []);
    });

    it('should give falsy value when  the task is not present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isUndefined(todo.removeItem(4));
    });
  });

  describe('load', function() {
    it('should give the instance of Todo class', function() {
      assert.instanceOf(
        Todo.load({title: 'school', id: 1, todoItems: []}),
        Todo
      );
    });
  });

  describe('toJSON', function() {
    it('should give the status of the todo', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.deepStrictEqual(todo.toJSON(), {
        title: 'homeWork',
        id: 1,
        todoItems: [{item: 'maths', id: 1, isDone: false}]
      });
    });
  });

  describe('getStatus', function() {
    it('should give the status of the todo', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.deepStrictEqual(todo.getStatus(), {
        title: 'homeWork',
        id: 1,
        todoItems: [{item: 'maths', id: 1, isDone: false}]
      });
    });
  });
});
