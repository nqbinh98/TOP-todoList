export class Project {
    constructor (name) {
        this._name = name;
        this._todos = []; 
    }

    getName () {
        return this._name;
    }

    setName (newName) {
        this._name = newName;
    }

    addTodo (todoObject) {
        this._todos.push(todoObject);
    }

    removeTodo (titleRemove) {
        this._todos = this._todos.filter(todo => todo._title != titleRemove);
    }

    getTodos () {
        return this._todos;
    }
}