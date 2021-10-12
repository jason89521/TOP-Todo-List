import { readItem } from "./storage";
const tasksKey = 'tasks';

/**
 * @param {HTMLUListElement} taskList 
 * @param {HTMLLIElement} addTaskLi
 * @param {string} projectName 
 */
 function resetTaskList(taskList, addTaskLi, projectName) {
    const allTasks = readItem(tasksKey);
    taskList.innerHTML = '';
    taskList.append(addTaskLi);
    allTasks.forEach((task) => {
        if (task.projectName === projectName) {
            const taskElement = task.createTaskElement();
            taskList.insertBefore(taskElement, addTaskLi);
        }
    });
}

export {resetTaskList};