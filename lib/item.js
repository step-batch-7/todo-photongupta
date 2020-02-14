class Item {
  constructor(item, id, status) {
    this.id = id;
    this.isDone = status;
    this.item = item;
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
