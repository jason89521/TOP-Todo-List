import Swal from "sweetalert2";
import Task from "./methods/task";
import { createItem, readItem, updateItem, updateItemsProperty, deleteItem } from "./methods/storage";
import { resetTaskList } from "./methods/display";
const tasksKey = 'tasks'
const taskList = document.getElementById('task-list');
const projectTitle = document.getElementById('project-title');
const addTaskLi = document.getElementById('add-task');
const form = document.getElementById('task-form');
// Initialize
form.remove();
form.addEventListener('keydown', e => {
    if (e.target.tagName.toLowerCase() === 'input' && e.key.toLowerCase() === 'enter')
        e.preventDefault();
});
resetTaskList(taskList, addTaskLi, 'Inbox');

taskList.addEventListener('click', async e => {
    const action = e.target.dataset.action;
    if (action === 'delete') {
        const liToBeDeleted = getLiFromChild(e.target);
        liToBeDeleted.remove();
        const id = parseInt(liToBeDeleted.dataset.id, 10);
        deleteItem(tasksKey, value => value.id === id);
    } else if (action === 'edit') {
        const liToBeEdited = getLiFromChild(e.target);
        const swalResult = await Swal.fire({
            html: form,
            preConfirm: () => {
                const elements = form.elements;
                if (!(/\S/.test(elements['title'].value)))
                    Swal.showValidationMessage('Please enter the title!');
            }
        });
        if (swalResult.value) {
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const date = form.elements['date'].value;
            const priority = form.elements['priority'].value;
            const projectName = projectTitle.innerText;
            const id = parseInt(liToBeEdited.dataset.id, 10);
            const task = new Task(title, description, date, priority, projectName, id);
            taskList.insertBefore(task.createTaskElement(), liToBeEdited);
            liToBeEdited.remove();
            updateItem(tasksKey, value => value.id === id, task);
        }
    }
});

addTaskLi.addEventListener('click', async e => {
    const swalResult = await Swal.fire({
        html: form,
        preConfirm: () => {
            const elements = form.elements;
            if (!(/\S/.test(elements['title'].value)))
                Swal.showValidationMessage('Please enter the title!');
        }
    })

    if (swalResult.value) {
        const title = form.elements['title'].value;
        const description = form.elements['description'].value;
        const date = form.elements['date'].value;
        const priority = form.elements['priority'].value;
        const projectName = projectTitle.innerText;
        const newTask = new Task(title, description, date, priority, projectName);
        taskList.insertBefore(newTask.createTaskElement(), addTaskLi);
        createItem(tasksKey, newTask);
    }
})

/**
 * @param {HTMLElement} child 
 */
function getLiFromChild(child) {
    let li = child;
    while (li.tagName.toLowerCase() !== 'li') {
        li = li.parentNode;
    }
    return li
}