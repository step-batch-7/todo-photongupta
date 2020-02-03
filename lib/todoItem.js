class todoItem {
  constructor(item) {
    this.id = Math.random();
    this.isDone = false;
    this.item = item;
  }
}

module.exports = todoItem;
