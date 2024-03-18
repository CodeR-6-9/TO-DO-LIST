let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    if (taskInput.value != ''){

    const task = {
        description: taskInput.value,
        priority: priorityInput.value,
    };

    tasks.push(task);
    updateList();
    saveTasksToLocalStorage();
}
else{
    alert("Please enter a task");
}
    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateList();
    saveTasksToLocalStorage();
}

function updateList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.sort((a, b) => b.priority - a.priority);

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task";

        listItem.innerHTML = `
            <span class="task-description">${task.description}</span>
            <span class="priority priority${task.priority}">Priority ${task.priority}</span>
            <button onclick="deleteTask(${index})" class = "btn1">Delete</button>
        `;

        taskList.appendChild(listItem);
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateList();
    }
}

loadTasksFromLocalStorage();
