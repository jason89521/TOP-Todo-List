import Swal from "sweetalert2";
import { Task, createTaskElement } from "./methods/task";
const taskList = document.getElementById('task-list');
const addTaskLi = document.getElementById('add-task');
const form = document.getElementById('task-form');
form.remove();

taskList.addEventListener('click', async e => {
    const action = e.target.dataset.action;
    if(action === 'add') {
        const {value: formValues} = await Swal.fire({
            html: form,
        })
        
        console.log(formValues);
    }
});