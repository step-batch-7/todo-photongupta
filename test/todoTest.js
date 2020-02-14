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
    it('should give true when the items are present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isTrue(todo.updateStatus([1]));
    });

    it('should give false when the items are not present', function() {
      const todo = new Todo({title: 'homeWork', id: 1});
      todo.addItems(['maths']);
      assert.isFalse(todo.updateStatus([1, 2]));
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
});
