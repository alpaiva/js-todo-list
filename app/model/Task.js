class Task {

    constructor(name, dueDate, priority, notes){
        this._name = name
        this._dueDate = dueDate
        this._priority = priority
        this._notes = notes
    }

    getName(){
        return this._name
    }

    getDueDate(){
        return this._dueDate
    }

    getPriority() {
        return this._priority
    }

    getNotes(){
        return this._notes
    }

    

}