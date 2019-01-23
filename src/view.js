import { EventEmitter, createElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();


    this.form = document.getElementById('form');
    this.eve = document.getElementById('event');
    this.date = document.getElementById('date');
    this.members = document.getElementById('members');
    this.prevButton = document.getElementById('prev');
    this.nextButton = document.getElementById('next');
    this.desc = document.getElementById('textyo');
    this.currentDate = document.querySelector('.current-month');
    
    //window.onload = this.createCalendar('calendar2', new Date().getFullYear(), new Date().getMonth());

    window.onload = this.emit.bind(this,'render');
  

    this.dayEvent();

    this.info = document.querySelectorAll('.info');

    this.form.addEventListener('submit', this.handleAdd.bind(this));

    this.nextButton.addEventListener('click', this.emit.bind(this,'render', 'next'));
    this.prevButton.addEventListener('click', this.emit.bind(this, 'render','previous'));
  }
  

  // вешает обработчик на дни
  dayEvent() {
   this.day = document.getElementsByClassName('day');
   this.addButton = document.querySelectorAll('.addButton');
   for (let i = 0; i < this.addButton.length; i++) {
    this.addButton[i].addEventListener('click', this.handleShow.bind(this, i));
  }
   
  }

  handleShow(a, event) {

    const dayId = this.day[a].id;
    //const item = this.day[a].querySelector(`[data-id="${dayId}"]`);

      this.form.classList.remove('invise');
      this.day[a].appendChild(this.form);
   }

  blaListener(div, items){
    div.addEventListener('click', () => items.classList.remove('invise'));
  }

  // eslint-disable-next-line class-methods-use-this
  createItem(item) {
    const first = createElement('h2', { className: 'eve' }, item.eventName);
    const second = createElement('p', { className: 'dt' }, item.eventDate);
    const third = createElement('p', { className: 'party' }, item.members);
    const fourth = createElement('p', { className: 'txt' }, item.description);
    const button = createElement('button', { className: 'but' }, 'Готово');
    const total = createElement(
      'form',
      { className: 'frm invise', 'data-id': item.id },
      first,
      second,
      third,
      fourth,
      button,
    );

    button.addEventListener('click', () => {
      event.preventDefault();
      total.classList.add('invise');
      total.classList.contains('invise');//почему-то не рабоает
    });
    return total;
  }

  handleAdd(event) {
    event.preventDefault();

    const value = [this.eve.value, this.date.value, this.members.value, this.desc.value];
    const id = Date.now();
    const key = event.target.parentNode.dataset.key;

    // так происходит запись в хранилище
    // ключ key берём из data-key="29/12/2018/4"
    this.emit('setEventOfDay',
      {
        key,
        event: {
          id,
          eventName: this.eve.value,
          eventDate: this.date.value,
          members: this.members.value,
          description: this.desc.value,
        },
      });

    // так читаем список событий из хранилища
    //this.emit('getAllEventsOfDay', event.target.parentNode.dataset.key);


    this.form.classList.add('invise');
    this.clearForm();
  }

  // Метод для очистки формы
  clearForm() {
    this.form.reset();
  }

  addItem(item) {
    console.log(item);
    const items = this.createItem(item[item.length-1]);
    const parentForm = this.form.parentNode;
    const valueEvent = item[item.length - 1].eventName;
    const valueMembers = item[item.length - 1].members;
    
    const values = parentForm.querySelector('.scrollable');
        
    let div = document.createElement(`div`);
    div.classList.add('info');

    let first = document.createElement('p');
    let second = document.createElement('p');

    first.innerHTML = valueEvent;
    second.innerHTML = valueMembers;

    div.appendChild(first);
    div.appendChild(second);
    values.appendChild(div);

    div.appendChild(items);

    this.blaListener(div, items);

    //parentForm.appendChild(items);
    parentForm.id = item[0].id;
  }

  /**
   * Метод для создания календаря
   *
   * @param {*} id id таблицы для календаря
   * @param {*} year год в календаре
   * @param {*} month1 месяц в календаре
   *
  */
  
  createCalendarModel(id, obj) {
    const Dlast = Object.keys(obj.days).length;
    const DNlast = obj.days[Dlast - 1].day;
    const DNfirst = obj.days[0].day;
    let calendar = '<tr>';

    const month12 = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 1; i < DNfirst; i++) calendar += '<td>';
    
    
    let keys = [];
    for (let i = 1; i <= Dlast; i++) {
      let day = obj.days[i-1].day;
      let div = `<div class=scrollable data-key="${i}/${obj.month}/${obj.year}/${day}">`
      if (i == new Date().getDate() && obj.year == new Date().getFullYear() && obj.month - 1 == new Date().getMonth()) {
        calendar += `<td class="day today" data-key="${i}/${obj.month}/${obj.year}/${day}">${i}<button class='addButton'>+</button>${div}`;
        keys.push(`${i}/${obj.month}/${obj.year}/${day}`);
      } else {
        calendar += `<td class="day" data-key="${i}/${obj.month}/${obj.year}/${day}">${i}<button class='addButton'>+</button>${div}`;
        keys.push(`${i}/${obj.month}/${obj.year}/${day}`);
      }
      if (day == 7) {
        calendar += '<tr>';
      }
    } 
    for (let i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector(`#${id} tbody`).innerHTML = calendar;
    this.currentDate.innerHTML = `${month12[obj.month - 1]} ${obj.year}`;
    this.currentDate.dataset.month = obj.month;
    this.currentDate.dataset.year = obj.year;

    this.dayEvent();
    this.emit('getAllEventsOfDay', keys);
  }

  addLoad(item, a){
    
    let first = document.createElement('p');
    for(let i = 0; i < item.length; i++){
    /*first.innerHTML = item[i].eventName;
    console.log(first);
    console.log(this.day[a]);
    this.day[a].appendChild(first);*/
    let items = this.createItem(item[i]);
    let valueEvent = item[i].eventName;
    let valueMembers = item[i].members;
    
    let values = this.day[a].querySelector('.scrollable');
        
    let div = document.createElement(`div`);
    div.classList.add('info');

    let first = document.createElement('p');
    let second = document.createElement('p');

    first.innerHTML = valueEvent;
    second.innerHTML = valueMembers;

    div.appendChild(first);
    div.appendChild(second);
    values.appendChild(div);

    div.appendChild(items);

    this.blaListener(div, items);        
    }
    
  }
}

export default View;
