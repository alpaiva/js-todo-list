class ListTask {

    constructor(){
        this._tasks = [];
        this._increment = 1;
    }

    add(task) {
        const entity = {
            id : this._increment++,
            task: task
        }
        this._tasks.push(entity)
    }

    getAll() {
        return [].concat(this._tasks)
    }

    remove(id) {
        
        const taskToRemove = this._tasks.findIndex(t => t.id == id)
        
        const before = this._tasks.slice(0, (taskToRemove + 1) - 1)
        
        const after = this._tasks.slice(taskToRemove + 1, this._tasks.length)
        
        this._tasks = before.concat(after)

        this._tasks.forEach(t => console.log(t))
        
    }
}