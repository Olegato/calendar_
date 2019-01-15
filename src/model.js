/* eslint-disable class-methods-use-this */
import { EventEmitter } from './helpers';
import contract from './contract';

// служебная функция
// проверяет формат строки запроса
function check(queryString) {
  if (typeof queryString !== 'string') {
    console.error('queryString', queryString);
    throw new TypeError('queryString - должен быть строкового типа!');
  }
  if (queryString.split('/').length !== 4) {
    console.error('queryString', queryString);
    throw new Error('queryString - недостаточно данных в строке, аргумент должен иметь такой формат "27/12/2018/4"');
  }
}

let modelThis = null;

class Model extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
    modelThis = this; // записал ссылку на this

    this.month = contract;
  }

  addItem(item) {
    this.items.push(item);
    return item;
  }
/**
 * Метод создает объект вида contract, вызываем его при window.onload
 * @param - необходимые параметры
 * @returns - объект вида contract
 */
  calendarData(){
    return obj
  }


  /**
   * Метод получения событий дня
   *
   * Принимает строку вида "27/12/2018/4"
   *
   * @param {string} queryString
   * @returns {array} Возвращает массив событий или пустой массив
   * @memberof Model
   */
  getAllEventsOfDay(queryString) {
    check(queryString);
    if (localStorage) {
      const events = JSON.parse(localStorage.getItem(queryString));
      if (events) {
        return events;
      }
    }
    return [];
  }

  /**
 * Получить по id одно событие дня
 *
 * @param {*} queryString "29/12/2018/4"
 * @param {*} id id события
 * @returns объект события дня
 * @memberof Model
 */
  getEventOfDayById(queryString, id) {
    const events = modelThis.getAllEventsOfDay(queryString);
    const eventById = events.find(event => event.id === id);
    return eventById;
  }

  /**
 * Метод добавления событий дня в хранилище
 *
 * @param {object}  принимает объект такого вида { key: '27/12/2018/4', event: { } }
 * @memberof Model
 */
  setEventOfDay(obj = { key: '', event: {} }) {
    if (!obj.key || typeof obj.key !== 'string') {
      throw new Error('setEventOfDay(obj) - obj обязательно должен иметь свойство key с строковым значением вида "27/12/2018/4"');
    }

    if (!obj.event) {
      throw new Error('setEventOfDay(obj) - obj обязательно должен иметь свойство event содержащее объект добавляемого события');
    }

    if (localStorage) {
      const { key } = obj;
      // eslint-disable-next-line no-param-reassign
      delete obj.key;
      const { event } = obj;
      const events = modelThis.getAllEventsOfDay(key);

      events.push(event);
      localStorage.setItem(key, JSON.stringify(events));
    }
  }

  /**
 * Обновить по id объект события дня
 *
 * @param {*} queryString "29/12/2018/4"
 * @param {*} id id события
 * @param {*} newObj объект с новыми значениями
 * @memberof Model
 */
  updateEventOfDayById(queryString, id, newObj) {
    const events = modelThis.getAllEventsOfDay(queryString);

    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === id) {
        const event = events[i];
        const keys = Object.keys(event);
        keys.forEach((key) => {
          if (key === 'id') return;
          if (typeof newObj[key] !== 'undefined') {
            event[key] = newObj[key];
          }
        });
        break;
      }
    }

    localStorage.setItem(queryString, JSON.stringify(events));
  }

  /**
 * Удалить событие дня по id
 *
 * @param {*} queryString "29/12/2018/4"
 * @param {*} id id события
 * @memberof Model
 */
  deleteEventOfDayById(queryString, id) {
    const events = modelThis.getAllEventsOfDay(queryString);
    const newEvents = events.filter(event => event.id !== id);
    localStorage.setItem(queryString, JSON.stringify(newEvents));
  }
}

export default Model;
