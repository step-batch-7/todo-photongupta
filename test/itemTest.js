const assert = require('chai').assert;
const Item = require('../lib/item');

describe('Item', function() {
  describe('editTask', function() {
    it('should edit the title of existing task', function() {
      const item = new Item('breakfast', 1, false);
      assert.strictEqual(item.editTask('dinner'), 'dinner');
    });
  });

  describe('toggleStatus', function() {
    it('should give true when the task is done', function() {
      const item = new Item('breakfast', 1, false);
      assert.isTrue(item.toggleStatus());
    });

    it('should give false when the task is not done', function() {
      const item = new Item('breakfast', 1, true);
      assert.isFalse(item.toggleStatus());
    });
  });
});
