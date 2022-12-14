// iff function variable protection and security improvement
var AppTodoList = (function (){
    let tasks = [];
    const taskList = document.getElementById("list");
    const addTaskInput = document.getElementById("add");
    const tasksCounter = document.getElementById("tasks-counter");

    console.log("Working");

    // throught api data fetching
    async function fetchTodos() {
      //get request
      // fetch('https://jsonplaceholder.typicode.com/todos') // promise return
      // .then(function(response){
      //     console.log(response);
      //     return response.json(); // promise return
      // }).then(function(data){
      //     // console.log(data);

      //     tasks = data.slice(0,15);
      //     renderList();
      // })
      // .catch(function(error){       // for error
      //     console.log('error', error);
      // })
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        tasks = data.slice(0, 7);
        renderList();
      } catch (error) {
        console.log(error);
      }
    }

    function addTaskToDOM(task) {
      const li = document.createElement("li");

      li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${
        task.completed ? "checked" : ""
      }  class = "custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.png" class="delete" data-id="${task.id}"/>
    `;
      taskList.append(li);
    }

    function renderList() {
      taskList.innerHTML = "";
      for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
      }
    }

    function toggleTask(taskId) {
      const task = tasks.filter(function (task) {
        return task.id == taskId;
      });
      if (task.length > 0) {
        const currentTask = task[0];

        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification("Task toggled successfully");
        return;
      }

      showNotification("Could not toggle the task");
    }

    function deleteTask(taskId) {
      const newTask = tasks.filter(function (task) {
        return task.id !== taskId;
      });

      tasks = newTask;
      renderList();
      showNotification("Task is deleted succesfully");
      return;
    }

    function addTask(task) {
      if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        //   console.log(tasks);
        return;
      }
    }

    function showNotification(title) {
      alert(title);
    }

    // Exeption handler
    function handleInputKeypress(e) {
      //    console.log(e);
      if (e.key == "Enter") {
        const title = e.target.value;
        // console.log("text", text);
        if (!title) {
          showNotification("Task text can be empty");
          return;
        }

        const task = {
          title,
          id: Date.now().toString(),
          completed: false,
        };

        e.target.value = "";
        addTask(task);
      }
    }

    function handleClickListener(e) {
      const target = e.target;

      if (target.className == "delete") {
        const taskId = parseInt(target.dataset.id);
        deleteTask(taskId);
        return;
      } else if (target.className == "custom-checkbox") {
        const taskId = target.id;
        toggleTask(taskId);
        return;
      }
    }
    function startApp() {
      addTaskInput.addEventListener("keyup", handleInputKeypress);
      document.addEventListener("click", handleClickListener);
      fetchTodos();
    }
    startApp();
    

    }
)();
