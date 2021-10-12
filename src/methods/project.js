/**
 * @param {string} projectName
 * @param {string} selectedClass 
 * @param {HTMLElement} projectTitle
 */
function changeSelectedProject(projectName, selectedClass, projectTitle) {
    const originProject = document.querySelector('.' + selectedClass);
    originProject.classList.remove(selectedClass);
    document.querySelector(`[data-project="${projectName}"]`).classList.add(selectedClass);
    projectTitle.innerText = projectName;
}

function createProjectElement(projectName) {
    const project = document.createElement('div');
    project.classList.add('sidebar-btn');
    project.dataset.project = projectName;
    project.innerHTML = `<span data-project="${projectName}">${projectName}</span>`;
    if(projectName === 'Inbox') return project;

    const div = document.createElement('div');
    const editIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');
    div.className = 'project-btns';
    editIcon.className = 'project-action far fa-edit';
    editIcon.dataset.action = 'edit';
    deleteIcon.className = 'project-action fas fa-trash-alt';
    deleteIcon.dataset.action = 'delete';
    div.append(editIcon, deleteIcon);
    project.append(div);
    return project;
}

function getProjectNameList(key) {
    const foo = localStorage.getItem(key);
    if(foo) {
        const projectNameList = foo.split(',');
        return projectNameList
    }else {
        const projectNameList = ['Inbox']
        localStorage.setItem(key, projectNameList)
        return projectNameList;
    }
}

/**
 * @param {HTMLElement} child 
 */
function getProjectFromChild(child){
    let project = child;
    while(!project.dataset.project)
        project = project.parentNode;
    return project;
}

export {changeSelectedProject, createProjectElement, getProjectNameList,
    getProjectFromChild};