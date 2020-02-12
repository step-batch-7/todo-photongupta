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

  idIncludesIn(ids) {
    return ids.includes(this.id);
  }
}

module.exports = Item;
