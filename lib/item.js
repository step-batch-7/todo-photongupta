class Item {
  constructor(item, id, status) {
    this.id = id;
    this.isDone = status;
    this.item = item;
  }

  unTick() {
    this.isDone = false;
  }

  tick() {
    this.isDone = true;
  }

  editTask(newTask) {
    this.item = newTask;
  }

  updateStatus(ids) {
    this.unTick();
    if (ids.includes(this.id)) {
      this.tick();
    }
  }
}

module.exports = Item;
