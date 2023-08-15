let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskDOM(task){
    const li=document.createElement('li');

    li.innerHTML=`
    <div>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    </div>
    <i class="delete fa-solid fa-trash" data-id="${task.id}"></i>
    `;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';
    for (let i=0;i<tasks.length;i++){
        addTaskDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id==taskId;
    });

    if (newTasks.length>0){
        const currentTask=newTasks[0];
    currentTask.completed=!currentTask.completed;
    renderList();
    showNotification('Task toggled successfully');
    return;
    }
    showNotification('Task can\'t be toggled');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id!==taskId;
    });
    tasks=newTasks;
    renderList();
    showNotification('Task Deleted Successfully');

}

function addTask (task) {
    if (task){
        tasks.push(task);
        renderList();
        showNotification('Task Added successfully');
        return;
    }
    showNotification('Task can\'t be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if (e.key==='Enter'){
        const text=e.target.value;
        //test 
        console.log('test',text)
        if (!text){
            showNotification('Task text can not be empty');
            return;
        }
        const task={
            title:text,
            id:Date.now().toString(),
            completed:false
        }
        e.target.value='';
        addTask(task);
    }
}

function handleClickListener(e) {
    const target = e.target;

    if (target.classList.contains('delete')) {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.classList.contains('custom-checkbox')) {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializationApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);
}

initializationApp();
