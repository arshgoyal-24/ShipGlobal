// Sample data for initial load
const todos = {
    backlog: ['Task 1', 'Task 2', 'Task 3'],
    todo: ['Task 4', 'Task 5', 'Task 6'],
    ongoing: ['Task 7', 'Task 8'],
    done: ['Task 9', 'Task 10']
};

// Load initial tasks into the DOM
function loadTodos() {
    for (let status in todos) {
        const list = document.getElementById(`${status}-list`);
        list.innerHTML = ''; // Clear the list before adding items
        todos[status].forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;

            const navButtons = document.createElement('div');
            navButtons.classList.add('nav-buttons');
            
            // Create left navigation button
            const leftBtn = document.createElement('button');
            leftBtn.textContent = '←';
            leftBtn.className = 'active';
            leftBtn.disabled = (status === 'backlog');
            leftBtn.addEventListener('click', () => moveTask(status, index, 'left'));
            
            // Create right navigation button
            const rightBtn = document.createElement('button');
            rightBtn.textContent = '→';
            rightBtn.className = 'active';
            rightBtn.disabled = (status === 'done');
            rightBtn.addEventListener('click', () => moveTask(status, index, 'right'));

            navButtons.appendChild(leftBtn);
            navButtons.appendChild(rightBtn);

            li.appendChild(navButtons);
            list.appendChild(li);
        });
    }
}

// Function to add a new task to the backlog
function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const newTask = newTaskInput.value.trim();

    if (newTask !== '') {
        todos.backlog.push(newTask); // Add the task to the backlog
        newTaskInput.value = ''; // Clear the input field
        loadTodos(); // Reload the task lists
    }
}

// Function to move tasks between statuses
function moveTask(currentStatus, taskIndex, direction) {
    const statusOrder = ['backlog', 'todo', 'ongoing', 'done'];
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    let targetStatusIndex;
    if (direction === 'left') {
        targetStatusIndex = currentStatusIndex - 1;
    } else if (direction === 'right') {
        targetStatusIndex = currentStatusIndex + 1;
    }

    const targetStatus = statusOrder[targetStatusIndex];

    // Move task from current status to target status
    const task = todos[currentStatus].splice(taskIndex, 1)[0];
    todos[targetStatus].push(task);

    // Reload the task lists
    loadTodos();
}

// Initial load of todos on page load
document.addEventListener('DOMContentLoaded', loadTodos);
