class Task{
    constructor(title, description, date, priority, projectName) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.projectName = projectName;
    }
}

/**
 * @param {Task} task 
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const taskInfo = document.createElement('div');
    const editBtn = document.createElement('button');
    li.className = 'task';
    checkBtn.className = 'task-check';
    taskInfo.className = 'task-info';
    editBtn.className = 'task-edit';
    li.append(checkBtn, taskInfo, editBtn);
    checkBtn.append(`<i class="fas fa-check"></i>`);
    taskInfo.append(`<span class="task-title">${task.title}</span>`);
    taskInfo.append(`<span class="task-description">${task.description}</span>`);
    taskInfo.append(`<span class="task-date">${task.date}</span>`);
    editBtn.append(`<i class="far fa-edit"></i>`);
    return li;
}

export {Task, createTaskElement};