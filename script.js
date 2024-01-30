// JavaScript for the task manager

// Sample task data structure
const tasks = [];

// Function to add a new task
function addTask() {
    const taskText = document.getElementById('task').value;
    if (taskText.trim() === '') return;

    // Create a task object
    const task = {
	id: Date.now(),
	text: taskText,
	completed: false,
    };

    // Add the task to the array
    tasks.push(task);

    // Clear the input field
    document.getElementById('task').value = '';

    // Update the task list
    renderTasks();
}

// Function to render tasks in the UI
function renderTasks() {
    const taskList = document.getElementById('task-list');
    const filter = document.getElementById('filter').value;

    // Clear the task list
    taskList.innerHTML = '';

    // Filter tasks based on the selected filter
    const filteredTasks = filter === 'completed'
	? tasks.filter(task => task.completed)
	: filter === 'incomplete'
	? tasks.filter(task => !task.completed)
	: tasks;

    // Render tasks
    filteredTasks.forEach(task => {
	const li = document.createElement('li');
	li.textContent = task.text;
	if (task.completed) {
	    li.classList.add('complete');
	}
	li.addEventListener('click', () => toggleTaskCompletion(task.id));
	taskList.appendChild(li);
    });
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
	task.completed = !task.completed;
	renderTasks();
    }
}

// Function to filter tasks based on completion status
function filterTasks(filter) {
    renderTasks();
}

// Add event listener to the "Enter" key for adding tasks
document.getElementById('task').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
	addTask();
    }
});

// Initial rendering of tasks
renderTasks();
// Save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Retrieve tasks from local storage
function getTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}

// Replace the initial task array with tasks from local storage
tasks = getTasksFromLocalStorage();

// Add event listener to save tasks whenever tasks are updated
function addTask(task) {
    // ... (existing addTask logic)

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Add event listener to toggle task completion status
function toggleTaskCompletion(taskId) {
    // ... (existing toggleTaskCompletion logic)

    // Save tasks to local storage
    saveTasksToLocalStorage();
}