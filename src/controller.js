class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
    view.on('setEventOfDay', this.model.setEventOfDay);
    view.on('getAllEventsOfDay', this.getEvents.bind(this));
    view.on('render', this.modelRender.bind(this));
  }

  addTodo(title) {
    const item = this.model.addItem({
      id: Date.now(),
      title,
      completed: true,
    });

    this.view.addItem(item);
  }

  modelRender(){
    const obj = this.model.calendarData();
    this.view.createCalendarModel(obj);
  }

  // TODO: написать этот метод
  getEvents(query) {
    const events = this.model.getAllEventsOfDay(query);
    console.log(query, events);
  }
}

export default Controller;
