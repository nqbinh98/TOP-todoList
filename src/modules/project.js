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

    removeTodo (idTodoRemove) {
        const initialLength = this._todos.length;
        // this._todos = this._todos.filter(todo => todo.getTitle() !== titleRemove);
        this._todos = this._todos.filter(todo => todo.getId() !== idTodoRemove);
        return this._todos.length < initialLength;
    }

    getTodos () {
        return this._todos;
    }
}