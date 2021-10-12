import Task from "./task";
const projectsKey = 'projects';
const tasksKey = 'tasks';

function taskReviver(key, value) {
    if (typeof value === 'object' && !(value instanceof Array)) {
        const title = value.title;
        const description = value.description;
        const date = value.date;
        const priority = value.priority;
        const projectName = value.projectName;
        const id = value.id;
        return new Task(title, description, date, priority, projectName, id);
    }
    return value;
}

/**
 * @param {string} key 
 * @returns {Task[] | string[]}
 */
function parse(key) {
    const items = localStorage.getItem(key);
    if(!items) return [];
    if(key === tasksKey) 
        return JSON.parse(localStorage.getItem(tasksKey), taskReviver);
    else if(key === projectsKey)
        return JSON.parse(localStorage.getItem(projectsKey));
}

function updateStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

/**
 * @param {string} key 
 * @param {Task | string} item 
 */
function createItem(key, item) {
    const items = parse(key);
    items.push(item);
    updateStorage(key, items);
}

function readItem(key, predicate) {
    const items = parse(key);
    return items;
}

/**
 * @param {string} key 
 * @param {(value:Task | string) => boolean} predicate 
 * @param {Task | string} item 
 */
function updateItem(key, predicate, item) {
    const items = parse(key);
    const idx = items.findIndex(predicate);
    items[idx] = item;
    updateStorage(key, items);
}

function deleteItem(key, predicate) {
    const items = parse(key);
    const idx = items.findIndex(predicate);
    items.splice(idx, 1);
    updateStorage(key, items);
}
export {createItem, readItem, updateItem, deleteItem};