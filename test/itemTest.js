const assert = require('chai').assert;
const Item = require('../lib/item');

describe('Item', function() {
  describe('unTick', function() {
    it('should give false when the task is not completed', function() {
      const item = new Item('breakfast', 1, false);
      assert.isFalse(item.unTick());
    });
  });

  describe('tick', function() {
    it('should give true when the task is completed', function() {
      const item = new Item('breakfast', 1, false);
      assert.isTrue(item.tick());
    });
  });

  describe('editTask', function() {
    it('should edit the title of existing task', function() {
      const item = new Item('breakfast', 1, false);
      assert.strictEqual(item.editTask('dinner'), 'dinner');
    });
  });

  describe('updateStatus', function() {
    it('should give true when the task is done', function() {
      const item = new Item('breakfast', 1, false);
      assert.isTrue(item.updateStatus([1, 2]));
    });

    it('should give false when the task is not done', function() {
      const item = new Item('breakfast', 1, false);
      assert.isFalse(item.updateStatus([2]));
    });
  });
});
