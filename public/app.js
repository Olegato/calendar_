/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EventEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return save; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return load; });
function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => {
        if (key.startsWith('data-')) {
            element.setAttribute(key, props[key]);
        } else {
            element[key] = props[key];
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);
    });

    return element;
}

class EventEmitter {//будет сообщать о том, что что-то произошло его подчипсикам
    constructor() {
        //console.log('eVENTeMITTERConstructor');
        this.events = {};//инициализируем объект
    }

    on(type, listener) {//для подписки на событие, 1- тип события 2 - функция обработчик
        //console.log('on');
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
        //console.log('on');
    }

    emit(type, arg) {
        //console.log('emit');
        if (this.events[type]) { //объект с хешем type если возвращает true то
            this.events[type].forEach(listener => listener(arg));
        }
    }
}

function save(data) {
    //console.log('save');
    const string = JSON.stringify(data);

    localStorage.setItem('todos', string);
}

function load() {
    //console.log('load');
    const string = localStorage.getItem('todos');
    const data = JSON.parse(string);

    return data;
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //console.log('ControllerConstructor');
        
        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));

        view.show(model.items);
    }

    addTodo(title) {
        //console.log('addTodo');
        const item = this.model.addItem({
            id: Date.now(),
            title, //title: title - одно и то же
            completed: false
        });
        this.view.addItem(item);
    
    }

    toggleTodo({ id, completed }) {
        const item = this.model.updateItem(id, { completed });

        this.view.toggleItem(item);
    }

    editTodo({ id, title }) {
        //console.log('editTodo');
        const item = this.model.updateItem(id, { title });
        
        this.view.editItem(item);
    }

    removeTodo(id) {
        //console.log('removeTodo');
        this.model.removeItem(id);
        this.view.removeItem(id);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Controller);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);


class Model extends __WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* EventEmitter */] { //изменяют состояние, манипулируем с объектами
    constructor(items = []) {
        super();
        //console.log('modelConstructor');
        
        this.items = items;
    }

    getItem(id) {
        //console.log('getItem');
        return this.items.find(item => item.id == id); //ищет элемент по его айди
    }
   

    addItem(item) { 
        //console.log('addItemModel');
        this.items.push(item); 
        this.emit('change', this.items); 
        
        return item;
        
    }

    updateItem(id, data) { 
        console.log('updateItem');
        console.log(data);
        
        
        const item = this.getItem(id);

        Object.keys(data).forEach(prop => item[prop] = data[prop]);

        this.emit('change', this.items);
        
        return item;
    }

    removeItem(id) {
        const index = this.items.findIndex(item => item.id == id);
        
        //console.log('removeItem');

        if (index > -1) {
            this.items.splice(index, 1);
            this.emit('change', this.items);
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Model);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);


class View extends __WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* EventEmitter */] { 
    constructor() {
        super();

        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');
        this.lol = document.getElementById('lol');
        this.checkAll = document.getElementById('checkAll');
        this.removeAll = document.getElementById('removeAll');
        this.removeCheck = document.getElementById('removeCheck');     
        
        this.form.addEventListener('submit', this.handleAdd.bind(this));
        this.checkAll.addEventListener('click', this.handleToggleAll.bind(this)); 
        this.removeAll.addEventListener('click', this.handleRemoveAll.bind(this)); 
        this.removeCheck.addEventListener('click', this.handleRemoveCheck.bind(this)); 
    }

    handleRemoveCheck(){
        const childList = this.list.querySelectorAll('.todo-item.completed');
        console.log(childList);
    
        childList.forEach(todo=>{
            console.log(todo);
            this.emit('remove', todo.getAttribute('data-id'));
         }
         )
    }

    handleShow(){
        console.log('handleShow');
        const childList = this.list.querySelectorAll('.todo-item');
        console.log(childList.length > 0);
        console.log(lol.classList.contains('stelth'));

        if(childList.length > 0 && lol.classList.contains('stelth')){
            this.lol.classList.remove('stelth');
        }else if(childList.length == 0 && !lol.classList.contains('stelth')){
            this.lol.classList.add('stelth');
        }
        
    }



    handleRemoveAll(event){
        const childList = this.list.querySelectorAll('.todo-item');
            
        childList.forEach(todo=>{
            this.emit('remove', todo.getAttribute('data-id'));
         }
         )
     }
     

    handleToggleAll(event){
       const childList = this.list.querySelectorAll('.todo-item');
       if(childList.length == 0){
        console.log('работает');
        }
       //console.log('toggleclick');
       childList.forEach(todo=>{
             
               
            const checkboxes =  todo.querySelector('.checkbox');
            checkboxes.checked = 'checked';
            this.handleToggleFor(checkboxes);
        }
        )
    }

    
    handleToggleFor(item){
        //console.log(item);
        const listItem = item.parentNode;
        const id = listItem.getAttribute('data-id');
        const completed = item.checked;

        this.emit('toggle', { id, completed });
    }

    createListItem(todo) { //создает элементы списка, импортируем из хелперса
        const checkbox = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
        const label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('label', { className: 'title' }, todo.title);
        const editInput = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('input', { type: 'text', className: 'textfield' });
        const editButton = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('button', { className: 'edit' }, 'Изменить');
        const deleteButton = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('button', { className: 'remove' }, 'Удалить');
        const item = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* createElement */])('li', { className: `todo-item${todo.completed ? ' completed': ''}`, 'data-id': todo.id }, checkbox, label, editInput, editButton, deleteButton);

        //console.log('createListItem');

        return this.addEventListeners(item);
    }

    addEventListeners(item) { //получает айтием и в результате его возвращает 

        //console.log('addEventListeners');

        const checkbox = item.querySelector('.checkbox');
        const editButton = item.querySelector('button.edit');
        const removeButton = item.querySelector('button.remove');


        //console.log(removeButton);
        
        checkbox.addEventListener('change', this.handleToggle.bind(this)); //назначаем обработчик, на событие
        editButton.addEventListener('click', this.handleEdit.bind(this))//bind привязывает метод к экземпляру класса
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    findListItem(id) {
        //console.log('findListItem');
        return this.list.querySelector(`[data-id="${id}"]`);//ищет элемент по айди(доп атрибут html)
    }

    handleAdd(event) {
        event.preventDefault();

        
        if (!this.input.value) return alert('Необходимо ввести название задачи.');//если пусто

        const value = this.input.value;

        this.emit('add', value);
    }
    
   
    
    


    handleToggle({ target }) {
        
        //console.log(target);

        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const completed = target.checked;

        //console.log(id);
        //console.log(completed);

        this.emit('toggle', { id, completed });
    }

    handleEdit({ target }) {

        //console.log('handleEdit');

        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title });
        } else {
            input.value = label.textContent;
            editButton.textContent = 'Сохранить';
            listItem.classList.add('editing');
        }
    }

    handleRemove({ target }) {

        //console.log('handleRemove');

        const listItem = target.parentNode;

        this.emit('remove', listItem.getAttribute('data-id'));
    }

    show(todos) {

        //console.log('show');

        todos.forEach(todo => {
            const listItem = this.createListItem(todo);//метод создает элементы списка
            this.list.appendChild(listItem);
        });
    }

    addItem(todo) {

        //console.log('addItemView');
        const listItem = this.createListItem(todo); 

        this.input.value = '';
        this.list.appendChild(listItem);
        this.handleShow();
    }

    toggleItem(todo) {
        //console.log('toggleItem');
        //console.log(todo);
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');
        
        checkbox.checked = todo.completed; 
        if (todo.completed) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    }

    editItem(todo) {
        //console.log('editItem');
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Изменить';
        listItem.classList.remove('editing');
    }

    removeItem(id) { 
        //console.log('removeItem');
        const listItem = this.findListItem(id);

        this.list.removeChild(listItem);
        this.handleShow();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controller__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers__ = __webpack_require__(0);





const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* load */])();

const model = new __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */](state || undefined);
model.on('change', state => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["b" /* save */])(state));

const view = new __WEBPACK_IMPORTED_MODULE_1__view__["a" /* default */]();
const controller = new __WEBPACK_IMPORTED_MODULE_2__controller__["a" /* default */](model, view);

/***/ })
/******/ ]);