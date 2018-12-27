import { EventEmitter, createElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    this.form = document.getElementById('form');
    this.eve = document.getElementById('event');
    this.date = document.getElementById('date');
    this.members = document.getElementById('members');
    this.desc = document.getElementById('textyo');
    this.day = document.getElementsByClassName('day');

    for (let i = 0; i < this.day.length; i++) {
      this.day[i].addEventListener('click', this.handleShow.bind(this, i));
    }

    this.form.addEventListener('submit', this.handleAdd.bind(this)); // разобрать

    window.onload = this.filling();
  }

  filling(){
    //this.day[0].innerHTML = '0ddddddddddddd';
    
     for (let i = 0; i < this.day.length; i++){
       this.day[i].innerHTML = `Тестовое заполнение и ${i}`;
     }
  }

  handleShow(a) {
    const dayId = this.day[a].id;
    const item = this.day[a].querySelector(`[data-id="${dayId}"]`);
    if (!item) {
      this.form.classList.remove('invise');
      this.day[a].appendChild(this.form);
      // this.day[a].insertAdjacentElement('afterend', this.form);

      console.log(this.form);
    } else {
      item.classList.remove('invise');
    }
  }

  createItem(item) {
    const first = createElement('h2', { className: 'eve' }, item.title[0]);
    const second = createElement('p', { className: 'dt' }, item.title[1]);
    const third = createElement('p', { className: 'party' }, item.title[2]);
    const fourth = createElement('textarea', { className: 'txt' }, item.title[3]);
    const total = createElement(
      'form',
      { className: 'frm invise', 'data-id': item.id },
      first,
      second,
      third,
      fourth
    );
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

    parentForm.appendChild(items);
    parentForm.id = item.id;
  }
}

export default View;
