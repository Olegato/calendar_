class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
  }

  addTodo(title) {
    console.log('title from controller.addTodo --- ', title);
    const item = this.model.addItem({
      id: Date.now(),
      title,
      completed: true,
    });
    console.log('item from controller.addTodo --- ', item);
    this.view.addItem(item);
  }
}

export default Controller;
