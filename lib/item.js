class Item {
  constructor(item, id, status) {
    this.id = id;
    this.isDone = status;
    this.item = item;
  }

  unTick() {
    return (this.isDone = false);
  }

  tick() {
    return (this.isDone = true);
  }

  editTask(newTask) {
    return (this.item = newTask);
  }

  updateStatus(ids) {
    this.unTick();
    if (ids.includes(this.id)) {
      this.tick();
    }
    return this.isDone;
  }
}

module.exports = Item;
