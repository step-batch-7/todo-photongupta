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

  hasSameId(id) {
    return this.id === +id;
  }
}

module.exports = Item;
