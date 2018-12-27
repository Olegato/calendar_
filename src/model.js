import { EventEmitter } from './helpers';

class Model extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
    // FIXME: позже удалить проверку ниже
    // для проверки
  //   this.setDayInfo({ key: '27/12/2018/4', data: 'some info', title: 'header' });
  //   console.log(this.getDayInfo('27/12/2018/4'));
  }

  addItem(item) {
    this.items.push(item);
    return item;
  }

  // FIXME: разобраться с емитером
  // Метод получения данных по дню
  // Принимает строку вида "27/12/2018/4"
  // Возвращает обеъкт с данными или null
  // eslint-disable-next-line class-methods-use-this
  getDayInfo(requestString) {
    if (typeof requestString !== 'string') throw new RangeError('getDayInfo(responseString) - аргумент должен быть строкового типа!');
    if (localStorage) {
      const info = JSON.parse(localStorage.getItem(requestString));
      if (info) {
        return info;
      }
    }
    return null;
  }

  // Метод добавления информации о дне в хранилище
  // принимает объект с обязательным свойством key значение которого строка вида "27/12/2018/4"
  // eslint-disable-next-line class-methods-use-this
  setDayInfo(obj) {
    if (!obj.key || typeof obj.key !== 'string') {
      throw new Error('setDayInfo(obj) - obj обязательно должен иметь свойство key с строковым значением вида "27/12/2018/4"');
    }

    if (localStorage) {
      const { key } = obj;
      // eslint-disable-next-line no-param-reassign
      delete obj.key;
      localStorage.setItem(key, JSON.stringify(obj));
    }
  }
}

export default Model;
