class Item {
  constructor(item, id, status) {
    this.id = id;
    this.isDone = status;
    this.item = item;
  }

  static load({item, id, isDone}) {
    return new Item(item, id, isDone);
  }

  toJSON() {
    return {id: this.id, isDone: this.isDone, item: this.item};
  }

  getStatus() {
    return {id: this.id, isDone: this.isDone, item: this.item};
  }

  editTask(newTask) {
    this.item = newTask;
    return this.item;
  }

  toggleStatus() {
    this.isDone = !this.isDone;
    return this.isDone;
  }
}

module.exports = Item;
