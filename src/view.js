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

    window.onload = this.createCalendar('calendar2', new Date().getFullYear(), new Date().getMonth());

    this.dayEvent();

    this.info = document.querySelectorAll('.info');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  //вешает обработчик на дни
  dayEvent(){
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

  createItem(item) {
    const first = createElement('h2', { className: 'eve' }, item.title[0]);
    const second = createElement('p', { className: 'dt' }, item.title[1]);
    const third = createElement('p', { className: 'party' }, item.title[2]);
    const fourth = createElement('p', { className: 'txt' }, item.title[3]);
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

    button.addEventListener('click', function(){
      event.preventDefault();
      total.classList.add('invise');
    })
    return total;
  }

  handleAdd(event) {
    event.preventDefault();

    const value = [this.eve.value, this.date.value, this.members.value, this.desc.value];
    this.emit('add', value);
    this.form.classList.add('invise');
  }

  addItem(item) {
    const items = this.createItem(item);
    const parentForm = this.form.parentNode;
    const values = parentForm.querySelectorAll('.info p');
     for(let i = 0; i < values.length; i++){
       values[i].innerHTML = item.title[i]
     }

    parentForm.appendChild(items);
    parentForm.id = item.id;
  }

  createCalendar(id, year, month1) {
    let Dlast = new Date(year, month1 + 1, 0).getDate();
    let D = new Date(year,month1,Dlast);
    let DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay();
    let DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay();
    let calendar = '<tr>';
        
  let month12 = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
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
        calendar += `<td class="day today" data-key="${i}/${D.getMonth()}/${D.getFullYear()}/${day}">${i} <div class="info"> <p><p>`;
      }else {
        calendar += `<td class="day" data-key="${i}/${D.getMonth()}/${D.getFullYear()}/${day}">${i} <div class="info"> <p><p>`;
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

    this.nextButton.addEventListener('click',this.createCalendar.bind(this, "calendar2", this.currentDate.dataset.year, parseFloat(this.currentDate.dataset.month)+1));
    this.prevButton.addEventListener('click',this.createCalendar.bind(this, "calendar2", this.currentDate.dataset.year, parseFloat(this.currentDate.dataset.month)-1));
    this.dayEvent();
  }
  
}

export default View;