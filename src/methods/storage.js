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
 * Parse the data in local storage.
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
 * Push an item to the localStorage with key.
 * @param {string} key 
 * @param {Task | string} item 
 */
function createItem(key, item) {
    const items = parse(key);
    items.push(item);
    updateStorage(key, items);
}

/**
 * Get items that satisfy the predicate.
 * If predicate is undefined, return all items.
 * @param {string} key 
 * @param {(value:Task | string) => boolean} predicate 
 * @returns 
 */
function readItem(key, predicate) {
    const items = parse(key);
    if(predicate !== undefined) {
        const result = items.filter(predicate);
        return result;
    }
    return items;
}

/**
 * Update one item that satisfy predicate.
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

/**
 * Update the propety of items that satisfy predicate.
 * @param {string} key 
 * @param {(value:Task | string) => boolean} predicate 
 * @param {string} propertyName 
 * @param {*} propertyValue 
 */
function updateItemsProperty(key, predicate, propertyName, propertyValue) {
    const items = parse(key);
    let idx = items.findIndex(predicate);
    while(idx != -1) {
        items[idx][propertyName] = propertyValue;
        idx = items.findIndex(predicate);
    }
    updateStorage(key, items);
}

/**
 * Delete all items that satisfy predicate.
 * @param {string} key 
 * @param {(value:Task | string) => boolean} predicate 
 */
function deleteItem(key, predicate) {
    const items = parse(key);
    let idx = items.findIndex(predicate);
    while(idx != -1) {
        items.splice(idx, 1);
        idx = items.findIndex(predicate);
    }
    updateStorage(key, items);
}

export {createItem, readItem, updateItem, updateItemsProperty, deleteItem};