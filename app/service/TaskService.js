const postTask = (task) => {
    const taskReq = {
        title: task.getName(),
        description: task.getNotes(),
        scheduleDate: task.getDueDate(),
        priority: task.getPriority(),
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return new Promise(
        (resolve) => {
            fetch('http://localhost:3000/tasks', {
                method: 'POST',
                mode: 'cors',
                headers: myHeaders,
                body: JSON.stringify(taskReq),
            }).then((task) => resolve(task));
        },
        (reject) => console.log('err')
    );
};

const getAllTasks = () => {
    return new Promise(
        (resolve) => {
            fetch('http://localhost:3000/tasks')
                .then((response) => response.json())
                .then((data) => resolve(data));
        },
        (reject) => console.log('err')
    );
};
