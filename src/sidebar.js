import Swal from "sweetalert2";
import { changeSelectedProject, createProjectElement, getProjectFromChild, 
    getProjectNameList } from "./methods/project";
const projectTitle = document.getElementById('project-title');
const sidebar = document.getElementById('sidebar');
const projectKey = 'projectNameList';
const projectNameList = getProjectNameList(projectKey);

// Initialize the sidebar.
projectNameList.forEach(projectName => {
    const project = createProjectElement(projectName);
    if (projectName === 'Inbox') project.classList.add('selected-project');
    sidebar.append(project);
});

// Handle click event on sidebar.
sidebar.addEventListener('click', async e => {
    if (e.target.dataset.project) {
        changeSelectedProject(e.target.dataset.project, 'selected-project', projectTitle);
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
                if (projectNameList.includes(value)) {
                    return 'The project name already exists!';
                }
            }
        });
        // User did not enter a project name.
        if (!newProjectName) return;
        // Append the new project to sidebar.
        const newProject = createProjectElement(newProjectName);
        sidebar.append(newProject);
        // Update the projectNameList and localStorage.
        projectNameList.push(newProjectName);
        localStorage.setItem(projectKey, projectNameList);
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
                if (value !== originProjectName && projectNameList.includes(value)) {
                    return 'The project name already exists!';
                }
            }
        });
        // If user did not enter a project name, or the new project name is the same as origin.
        if(!newProjectName || newProjectName === originProjectName)
            return;
        // Update the project element.
        projectToBeEdited.dataset.project = newProjectName;
        projectToBeEdited.querySelector('span').innerText = newProjectName
        // Update projectNameList and localStorage.
        const idx = projectNameList.indexOf(originProjectName);
        projectNameList[idx] = newProjectName;
        localStorage.setItem(projectKey, projectNameList);
        // If the edited project is the selected project, update the project title.
        if(projectTitle.innerText === originProjectName)
            projectTitle.innerText = newProjectName;
    } else if(action === 'delete') {
        const projectToBeDeleted = getProjectFromChild(e.target);
        // If the project to be deleted is the same as the selected project,
        // make Inbox be the next selected project after deleting.
        const projectName = projectToBeDeleted.dataset.project;
        if(projectName === projectTitle.innerText) {
            document.querySelector(`[data-project="Inbox"]`).classList.add('selected-project');
            projectTitle.innerText = 'Inbox';
        }
        projectToBeDeleted.remove();
        // Update projectNameList and localStorage.
        const idx = projectNameList.indexOf(projectName);
        projectNameList.splice(idx, 1);
        localStorage.setItem(projectKey, projectNameList);
    }
});