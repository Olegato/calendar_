/* eslint-disable class-methods-use-this */
import { EventEmitter } from './helpers';

class Model extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;

    // FIXME: позже удалить проверку ниже
    // для проверки
    this.setEventsOfDay({ key: '27/12/2018/4', events: [{ title: 'header', body: 'some info' }] });
    console.log(this.getAllEventsOfDay('27/12/2018/4'));
  }

  addItem(item) {
    this.items.push(item);
    return item;
  }

  // FIXME: разобраться с емитером

  /**
   * Метод получения событий дня
   *
   * Принимает строку вида "27/12/2018/4"
   *
   * @param {string} queryString
   * @returns {array} Возвращает массив событий или null
   * @memberof Model
   */
  getAllEventsOfDay(queryString) {
    if (typeof queryString !== 'string') {
      console.error('queryString', queryString);
      throw new TypeError('getAllEventsOfDay(queryString) - аргумент должен быть строкового типа!');
    }
    if (queryString.split('/').length !== 4) {
      console.error('queryString', queryString);
      throw new Error('getAllEventsOfDay(queryString) - недостаточно данных в строке, аргумент должен иметь такой формат "27/12/2018/4"');
    }
    if (localStorage) {
      const events = JSON.parse(localStorage.getItem(queryString));
      if (events) {
        return events;
      }
    }
    return null;
  }

  /**
 * Метод добавления событий дня в хранилище
 *
 * @param {object}  принимает объект такого вида { key: '27/12/2018/4', events: [ ] }
 * @memberof Model
 */
  setEventsOfDay(obj = { key: '', events: [] }) {
    if (!obj.key || typeof obj.key !== 'string') {
      throw new Error('setEventsOfDay(obj) - obj обязательно должен иметь свойство key с строковым значением вида "27/12/2018/4"');
    }

    if (!obj.events) {
      throw new Error('setEventsOfDay(obj) - obj обязательно должен иметь свойство events содержащее массив объектов событий');
    }

    if (localStorage) {
      const { key } = obj;
      // eslint-disable-next-line no-param-reassign
      delete obj.key;
      const { events } = obj;
      localStorage.setItem(key, JSON.stringify(events));
    }
  }
}

export default Model;
