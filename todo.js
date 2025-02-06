
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    // Checkbox for marking completion
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleTask);

    // Task text
    let span = document.createElement("span");
    span.textContent = taskText;

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    // Append elements to li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // Append li to task list
    taskList.appendChild(li);
    
    // Clear input field
    taskInput.value = "";
}

function deleteTask(event) {
    event.target.parentElement.remove();
    saveTasks();
}

function toggleTask(event) {
    let task = event.target.nextElementSibling;
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let isCompleted = li.querySelector("input").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            let taskList = document.getElementById("taskList");
            let li = document.createElement("li");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", toggleTask);

            let span = document.createElement("span");
            span.textContent = task.text;
            if (task.completed) span.classList.add("completed");

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", deleteTask);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}
s