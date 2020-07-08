//Defining UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    //Adding a new task
    form.addEventListener('submit',addTask);

    //
    taskList.addEventListener('click',removeTask);

    //Clear all tasks
    clearBtn.addEventListener('click',clearTasks);

    //filter through the tasks in list
    filter.addEventListener('keyup',filterTasks);
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create a list item
    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    //append li to ul

    taskList.appendChild(li);

    taskInput.value = '';


    e.preventDefault();
}

//Remove tasks

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
            
    }

}

//Clear all tasks

function clearTasks(){

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
}

//Filter tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != 0){
                task.style.display = 'none';
        }else{
            task.style.display = 'block';
        }
    });    
}