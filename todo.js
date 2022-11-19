const tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

console.log("Working");

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} data-id="12" class = "custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="bin.png" class="delete" data-id="${task.id}"/>
    `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';
    for(let i = 0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
}

function toggleTask(taskId) {
    const task = tasks.filter(function(task){
         return task.id == taskId;
    });
    if (task.length > 0) { 
        const currentTask = task[0];

        currentTask.done = !currentTask.done; 
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

showNotification('Could not toggle the task');
}

function deleteTask(taskId) {
    const newTask = tasks.filter(function(task){
        return tasks.id !== taskId;
    });

    tasks = newTask;
    renderList();
    showNotification('Task is deleted');
}

function addTask(task) {
    if (task) {
      tasks.push(task);
      renderList();
      showNotification("Task added successfully");
      console.log(tasks);
      return;
    }
}

function showNotification(text) {
    alert(text);
}

// Exeption handler
function handleInputKeypress(e) {
//    console.log(e);
  if (e.key == "Enter") {
    const text = e.target.value;
    console.log("text", text);
    if (!text) {
      showNotification("Task text can be empty");
      return;
    }

    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };

    e.target.value ="";
    addTask(task);
  }
}

function handleClickListener(e){
    const target = e.target;

    if(target.className == delete){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className == 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }

}
function startApp()
{
addTaskInput.addEventListener("keyup", handleInputKeypress);
document.addEventListener('click', handleClickListener);
}
startApp();