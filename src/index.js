import Model from './model';
import View from './view';
import Controller from './controller';

const model = new Model();

const view = new View();
const controller = new Controller(model, view);

console.log(model.calendarData());
console.log(model.prevMonth());
console.log(model.nextMonth());
console.log(model.nextMonth());

// function test() {
//   document.getElementsByClassName('day')[0].dataset.key = '29/12/2018/4';
//   model.setEventOfDay({ key: '27/12/2018/4', event: [{ id: Date.now(), title: 'header', body: 'some info' }] });
//   console.log('27/12/2018/4', model.getAllEventsOfDay('27/12/2018/4'));
//   // model.deleteEventOfDayById('29/12/2018/4', 1545951105469);
//   model.updateEventOfDayById('29/12/2018/4', 1545951875938, { qw: 3, members: 'qwewrrqwr' });
//   console.log(model.getEventOfDayById('29/12/2018/4', 1545951875938));
// }

// test();
