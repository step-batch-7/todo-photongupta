class Item {
  constructor(item, id) {
    this.id = id;
    this.isDone = false;
    this.item = item;
  }

  unTick() {
    this.isDone = false;
  }

  tick() {
    this.isDone = true;
  }
}

module.exports = Item;
