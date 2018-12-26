import { EventEmitter } from './helpers';

class Model extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
  }

  addItem(item) {
    this.items.push(item);
    return item;
  }
}

export default Model;
