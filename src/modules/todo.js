export class Todo {
    constructor (title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }


    // getters
    getTitle () {
        return this._title;
    }
    getDescription () {
        return this._description;
    }
    getDueDate () {
        return this._dueDate;
    }
    getPriority () {
        return this._priority;
    }
    getIsComplete () {
        return this._isComplete;
    }

    // setters
    setTitle (newTitle) {
        this._title = newTitle;
    }
    setDescription (newDescription) {
        this._description = newDescription;
    }
    setDueDate (newDueDate) {
        this._dueDate = newDueDate;
    }
    setPriority (newPriority) {
        this._priority = newPriority;
    }
    setIsComplete (newComplete) {
        this._isComplete = newComplete;
    }

    toggleCompleted () {
        this._isComplete = !this._isComplete
    }

}