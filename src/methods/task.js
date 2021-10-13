export default class Task {
    /**
     * @param {*} title 
     * @param {*} description 
     * @param {*} date 
     * @param {*} priority 
     * @param {*} projectName 
     * @param {number} id 
     */
    constructor(title, description, date, priority, projectName, id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.projectName = projectName;
        this.id = (id) ? id : Date.now();
    }

    createTaskElement() {
        const li = document.createElement('li');
        const checkBtn = document.createElement('button');
        const taskInfo = document.createElement('div');
        const editBtn = document.createElement('button');
        li.dataset.id = this.id;
        li.className = `task ${this.priority}-priority`;
        checkBtn.className = 'task-check';
        taskInfo.className = 'task-info';
        editBtn.className = 'task-edit';
        li.append(checkBtn, taskInfo, editBtn);
        checkBtn.innerHTML = `<i data-action="delete" class="fas fa-check"></i>`;
        taskInfo.innerHTML = `<span class="task-title">${this.title}</span>`;
        taskInfo.innerHTML += `<span class="task-description">${this.description}</span>`;
        taskInfo.innerHTML += `<span class="task-date">${this.date}</span>`;
        editBtn.innerHTML = `<i data-action="edit" class="far fa-edit"></i>`;
        checkBtn.dataset.action = 'delete';
        editBtn.dataset.action = 'edit';
        return li;
    }
}
