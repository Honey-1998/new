const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage and add them to the list
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.completed));

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

function addTask(text, completed) {
  // Create task item and set text
  const taskItem = document.createElement("li");
  const taskText = document.createElement("span");

  taskText.textContent = text;
  taskItem.appendChild(taskText);

  const taskButtons = document.createElement("div");
  const taskEdit = document.createElement("span");
  const taskDelete = document.createElement("span");

  taskButtons.className = "task-button";
  taskEdit.className = "edit";
  taskDelete.className = "delete";

  taskEdit.innerText = "edit";
  taskDelete.innerText = "delete";

  taskItem.appendChild(taskEdit);
  taskItem.appendChild(taskDelete);

  // Mark as completed if applicable

  // Create and add "Complete" button

  // Create and add "Edit" button

  taskEdit.addEventListener("click", () => {
    const parent = taskEdit.parentNode;
    const childNod = parent.childNodes[0];
    childNod.contentEditable = true;
    console.log(childNod);
    saveTasks();
  });

//   taskDelete.addEventListener("click", () => {
//     delete taskDelete.parentNode();
//     console.log("chi");
//   });

taskDelete.addEventListener("click", () => {
    const parent = taskDelete.parentNode;
    taskList.removeChild(parent);
    saveTasks();
  });
  // Add logic for editing a task

  // Create and add "Delete" button

  // Append buttons to task item and task item to list

  taskList.appendChild(taskItem);

  // Save updated tasks to local storage
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("span").textContent, // Extract task text
    completed: task.classList.contains("completed") // Check if task is completed
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
}
