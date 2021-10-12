import Swal from "sweetalert2";
import { changeSelectedProject, createProjectElement, getProjectFromChild } from "./methods/project";
import { createItem, deleteItem, readItem, updateItem, updateItemsProperty } from "./methods/storage";
import { resetTaskList } from "./methods/display";
const projectTitle = document.getElementById('project-title');
const sidebar = document.getElementById('sidebar');
const taskList = document.getElementById('task-list');
const addTaskLi = document.getElementById('add-task');
const projectsKey = 'projects';
const tasksKey = 'tasks';

// Initialize the sidebar.
initialize();
function initialize() {
    if (readItem(projectsKey).length === 0)
        createItem(projectsKey, 'Inbox');

    readItem(projectsKey).forEach(projectName => {
        const projectElement = createProjectElement(projectName);
        if (projectName === 'Inbox')
            projectElement.classList.add('selected-project');
        sidebar.append(projectElement);
    });
    resetTaskList(taskList, addTaskLi, 'Inbox');
}

// Handle click event on sidebar.
sidebar.addEventListener('click', async e => {
    if (e.target.dataset.project) {
        changeSelectedProject(e.target.dataset.project, 'selected-project', projectTitle);
        resetTaskList(taskList, addTaskLi, e.target.dataset.project);
        return;
    }

    const action = e.target.dataset.action;
    if (action === 'add') {
        const { value: newProjectName } = await Swal.fire({
            title: 'Enter the new project name',
            input: 'text',
            inputValidator: value => {
                if (!value || !(/\S/.test(value))) {
                    return 'The project name is not accepted.'
                }
                if (readItem(projectsKey).includes(value)) {
                    return 'The project name already exists!';
                }
            }
        });
        // User did not enter a project name.
        if (!newProjectName) return;
        // Append the new project to sidebar.
        const newProject = createProjectElement(newProjectName);
        sidebar.append(newProject);
        createItem(projectsKey, newProjectName);
    } else if (action === 'edit') {
        const projectToBeEdited = getProjectFromChild(e.target);
        const originProjectName = projectToBeEdited.dataset.project;
        const { value: newProjectName } = await Swal.fire({
            title: 'Enter the new project name',
            input: 'text',
            inputValidator: value => {
                if (!value || !(/\S/.test(value))) {
                    return 'The project name is not accepted.'
                }
                if (value !== originProjectName && readItem(projectsKey).includes(value)) {
                    return 'The project name already exists!';
                }
            }
        });
        // If user did not enter a project name, or the new project name is the same as origin.
        if (!newProjectName || newProjectName === originProjectName)
            return;
        // Update the project element.
        projectToBeEdited.dataset.project = newProjectName;
        projectToBeEdited.querySelector('span').innerText = newProjectName;
        projectToBeEdited.querySelector('span').dataset.project = newProjectName;
        updateItem(projectsKey, value => value === originProjectName, newProjectName);
        updateItemsProperty(tasksKey, value => value.projectName === originProjectName, 'projectName', newProjectName);
        // If the edited project is the selected project, update the project title.
        if (projectTitle.innerText === originProjectName)
            projectTitle.innerText = newProjectName;
    } else if (action === 'delete') {
        const projectToBeDeleted = getProjectFromChild(e.target);
        // If the project to be deleted is the same as the selected project,
        // make Inbox be the next selected project after deleting.
        const projectName = projectToBeDeleted.dataset.project;
        if (projectName === projectTitle.innerText) {
            changeSelectedProject('Inbox', 'selected-project', projectTitle);
            resetTaskList(taskList, addTaskLi, 'Inbox');
        }
        projectToBeDeleted.remove();
        deleteItem(projectsKey, value => value === projectName);
        deleteItem(tasksKey, value => value.projectName === projectName);
    }
});