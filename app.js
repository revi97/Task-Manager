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

    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);


    taskList.addEventListener('click',removeTask);

    //Clear all tasks
    clearBtn.addEventListener('click',clearTasks);

    //filter through the tasks in list
    filter.addEventListener('keyup',filterTasks);
}

//Loading tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create a list item
    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));

    //Create new link element

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    //append li to ul

    taskList.appendChild(li);
    });
}
//Adding tasks

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

    //Storing in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';


    e.preventDefault();
}

//Store locally

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove tasks

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Removing from local storage
            removeTaskFromLocalStoarge( e.target.parentElement.parentElement);
        }
            
    }

}

//REmoving from local storage

function removeTaskFromLocalStoarge(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        if(taskItem.textContent === task){
                tasks.splice(index,1);
        }

    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

    
}

//Clear all tasks

function clearTasks(){

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        clerTasksFromLocalStorage();
        
}

function clerTasksFromLocalStorage(){
    localStorage.clear();
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