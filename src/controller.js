class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
    view.on('setEventOfDay', this.model.setEventOfDay);
    view.on('getAllEventsOfDay', this.getEvents.bind(this));
    view.on('render', this.modelRender.bind(this));
  }

  // FIXME: эта штука работает не правильно
  addTodo(title) {
    const event = {
      id: Date.now(),
      title,
      completed: true,
    };

    this.view.addItem(event);
  }

  modelRender() {
    const obj = this.model.calendarData();
    console.log(obj);
    // this.view.createCalendarModel(obj);
  }

  // TODO: написать этот метод
  getEvents(query) {
    const events = this.model.getAllEventsOfDay(query);
    console.log(query, events);
  }
}

export default Controller;
