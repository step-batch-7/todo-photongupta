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

  describe('modifyItemList', function() {
    it('should add the given items into the existing todo', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      assert.strictEqual(
        todo.modifyItemList([{item: 'maths', isDone: false, id: 1}]),
        1
      );
    });
  });

  describe('updateStatus', function() {
    it('should change the status of items', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.strictEqual(todo.updateStatus([1, 2]), 1);
    });
  });

  describe('editTask', function() {
    it('should give true when the task is existing', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isTrue(todo.editTask('english', 1));
    });

    it('should give false when the task is not existing', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isFalse(todo.editTask('english', 2));
    });
  });
});
