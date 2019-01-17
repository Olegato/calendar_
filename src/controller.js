class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
    //view.on('setEventOfDay', this.model.setEventOfDay);
    view.on('setEventOfDay', this.addTodoModel.bind(this));
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

  addTodoModel(obj){
    const keys = obj.key;
    this.model.setEventOfDay(obj);
    const event = this.model.getAllEventsOfDay(keys);
    //console.log(`event - ${Object.keys(event)}`);
    this.view.addItem(event);
  }


  modelRender(month) {
    let obj;
    if(month == 'next'){
      obj = this.model.nextMonth()
    }else if(month == 'previous'){
      obj = this.model.prevMonth()
    }else{
      obj = this.model.calendarData();
    }
    this.view.createCalendarModel('calendar2', obj);
    }

  // TODO: написать этот метод
  getEvents(query) {
    const events = this.model.getAllEventsOfDay(query);
    //console.log(query, events);
  }
}

export default Controller;
