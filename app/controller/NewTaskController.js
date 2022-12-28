class NewTaskController {

    constructor() {
        this._$ = document.querySelector.bind(document)
        this._container = this._$('[container]')
        this._taskTable = this._$('.taskTable')
        this._listTask = new ListTask()
    }

    showForm() {
        const innerHtml = `<div class='form-list'>
        <form onsubmit='newTaskController.addTask(event)'>
            <input id='taskName' cols ='60' type='text' placeholder='task name'/> 
            <div class='dueDateGroup'>
                <input class='ctlDueDate' type='button' value='Today' onclick='newTaskController.setDueDateToday()'/>
                <input class='ctlDueDate' type='button' value='Tomorrow' onclick='newTaskController.setDueDateTomorrow()'/>
                <input class='ctlDueDate' dueDate id='dueDate' type='date'/>
            </div>
            <div class='priorityGroup'>
                <label class='labelToDo' for='pioritySel'>Priority</label>
                <select id='priority' name='prioritySel'>
                    <option value='1'>None</option>
                    <option value='2'>Low</option>
                    <option value='3'>Medium</option>
                    <option value='4'>High</option>
                </select>
            </div>
            <textarea id='notes' rows='5' cols='60' placeholder='Notes'></textarea>
            <div class='addGroup'>
                <button class='btAdd' type="submit"  >Add</button>
            </div>
        </form>
        </div>`
        this.updateView(innerHtml)
        this._name = this._$('#taskName')
        this._dueDate = this._$('#dueDate')
        this._priority = this._$('#priority')
        this._notes = this._$('#notes')
    }

    updateView(innerHtml) {
        this._container.innerHTML = innerHtml
    }

    setDueDateToday() {
        const dateControl = this._getDueDate(0)
        this._$('[dueDate]').value = dateControl
    }

    setDueDateTomorrow() {
        const dateControl = this._getDueDate(1)
        this._$('#dueDate').value = dateControl
    }

    _getDueDate(dayToAdd = 0) {
        const date = new Date()
        date.setDate(date.getDate() + dayToAdd)

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + '-' + month + '-' + day
    }

    addTask(event) {
        event.preventDefault();
        
        const task = new Task(this._name.value,
            this._dueDate.value,
            this._priority.value,
            this._notes.value)

        postTask(task).then(task => this.fetchTasks());
      

    }

    remove(item, id){
        
        const row = item.parentNode.parentNode
        row.parentNode.removeChild(row)
        this._listTask.remove(id)
        
    }

    fetchTasks() {
       
        getAllTasks().then(tasks => {
            let listTasks = tasks.map(task => new Task(
                    task.title,
                    task.scheduleDate,
                    task.priority,
                    task.description));
            let items = 
            `<table id='taskTable' class='task-table'>
                <thead>
                    <tr>
                        
                        <th>Priority</th>
                        <th>Name</th>
                        <th>Due Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>
                    ${listTasks.map(n =>
                        `
                                <tr>
                                    
                                    <td>${n.getPriority()}</td>
                                    <td>${n.getName()}</td>
                                    <td>${n.getDueDate()}</td>
                                    <td>${n.getNotes()}</td>     
                                    <td><button onclick='newTaskController.remove(this, "${n.id}")'>OK</td>
                                </tr>
                            `
                    ).join('')}
                    </tbody>
            </table>`

            const innerHtml = `<div listTasks 
            class='content-list'>${items}</div>`

            this.updateView(innerHtml)
        });
    }

}