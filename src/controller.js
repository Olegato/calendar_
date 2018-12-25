class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;

        view.on('add', this.addTodo.bind(this));
    }

    addTodo(title) {
        const item = this.model.addItem({
            id: Date.now(),
            title,
            completed: true
        });

        this.view.addItem(item);
    }
}

export default Controller;