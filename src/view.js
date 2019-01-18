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
    for (let i = 0; i < this.day.length; i++) {
      this.day[i].addEventListener('click', this.handleShow.bind(this, i));
    }
  }

  handleShow(a, event) {
    // Если кликнули не по дню - уходим с обработчика
    const isNotDay = !event.target.classList.contains('day');

    if (isNotDay) return;
    const dayId = this.day[a].id;
    const item = this.day[a].querySelector(`[data-id="${dayId}"]`);
    if (!item) {
      this.form.classList.remove('invise');
      this.day[a].appendChild(this.form);
      // this.day[a].insertAdjacentElement('afterend', this.form);
    } else {
      item.classList.remove('invise');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createItem(item) {
    const first = createElement('h2', { className: 'eve' }, item[0].eventName);
    const second = createElement('p', { className: 'dt' }, item[0].eventDate);
    const third = createElement('p', { className: 'party' }, item[0].members);
    const fourth = createElement('p', { className: 'txt' }, item[0].description);
    const button = createElement('button', { className: 'but' }, 'Готово');
    console.log(item[0].id);
    const total = createElement(
      'form',
      { className: 'frm invise', 'data-id': item[0].id },
      first,
      second,
      third,
      fourth,
      button,
    );

    button.addEventListener('click', () => {
      event.preventDefault();
      total.classList.add('invise');
    });
    return total;
  }

  handleAdd(event) {
    event.preventDefault();

    const value = [this.eve.value, this.date.value, this.members.value, this.desc.value];
    const id = Date.now();
    const key = event.target.parentNode.dataset.key;
   // this.emit('add', value);

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
    this.emit('getAllEventsOfDay', event.target.parentNode.dataset.key);


    this.form.classList.add('invise');
    this.clearForm();
  }

  // Метод для очистки формы
  clearForm() {
    this.form.reset();
  }

  addItem(item) {
    const items = this.createItem(item);
    console.log(items);
    const parentForm = this.form.parentNode;
    // Добавляем значения из формы в day
    //const values = parentForm.querySelectorAll('.info p');
    //for (let i = 0; i < values.length; i++) {
      //values[i].innerHTML = item.title[i];
    //}

    parentForm.appendChild(items);
    parentForm.id = item[0].id;
  }

  /**
   * Метод для создания календаря
   *
   * @param {*} id id таблицы для календаря
   * @param {*} year год в календаре
   * @param {*} month1 месяц в календаре
   */

  createCalendar(id, year, month1) {
    const Dlast = new Date(year, month1 + 1, 0).getDate();
    const D = new Date(year, month1, Dlast);
    const DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
    const DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
    let calendar = '<tr>';

    const month12 = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    if (DNfirst != 0) {
      for (let i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
      for (let i = 0; i < 6; i++) calendar += '<td>';
    }

    for (let i = 1; i <= Dlast; i++) {
      let day = new Date(D.getFullYear(), D.getMonth(), i).getDay();
      if (day == 0) {
        day = 7;
      }
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += `<td class="day today" data-key="${i}/${D.getMonth() + 1}/${D.getFullYear()}/${day}">${i} <div class="info"> <p><p>`;
      } else {
        calendar += `<td class="day" data-key="${i}/${D.getMonth() + 1}/${D.getFullYear()}/${day}">${i} <div class="info"> <p><p>`;
      }
      if (day == 7) {
        calendar += '<tr>';
      } 
    }
    for (let i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector(`#${id} tbody`).innerHTML = calendar;
    this.currentDate.innerHTML = `${month12[D.getMonth()]} ${D.getFullYear()}`;
    this.currentDate.dataset.month = month1;
    this.currentDate.dataset.year = year;

    //this.buttonsEvent();
    this.dayEvent();
  }
  
  createCalendarModel(id, obj) {
    const Dlast = Object.keys(obj.days).length;
    const DNlast = obj.days[Dlast - 1].day;
    const DNfirst = obj.days[0].day;
    let calendar = '<tr>';

    const month12 = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    for (let i = 1; i < DNfirst; i++) calendar += '<td>';

    for (let i = 1; i <= Dlast; i++) {
      let day = obj.days[i-1].day;

      if (i == new Date().getDate() && obj.year == new Date().getFullYear() && obj.month - 1 == new Date().getMonth()) {
        calendar += `<td class="day today" data-key="${i}/${obj.month}/${obj.year}/${day}"><div class=scrollable>${i} <div class="info"> <p><p>`;
      } else {
        calendar += `<td class="day" data-key="${i}/${obj.month}/${obj.year}/${day}"><div class=scrollable>${i} <div class="info"> <p><p>`;
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
  }
}

export default View;
