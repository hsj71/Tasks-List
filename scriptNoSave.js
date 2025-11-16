const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");

// Add task when Enter key is pressed
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

// Add task when Add button is clicked
document.querySelector("#push").onclick = function () {
    createTask();
};

// Create a new task
function createTask() {
    if (taskInput.value.trim().length === 0) {
        alert("The task field is blank. Enter a task name and try again.");
        return;
    }

    taskSection.innerHTML += `
        <div class="task">
            <label id="taskname">
                <input onclick="updateTask(this)" type="checkbox" id="check-task">
                <p>${taskInput.value}</p>
            </label>
            <div class="delete">
                <i class="uil uil-trash"></i>
            </div>
        </div>
    `;

    attachDeleteEvents();
    updateScrollState();

    taskInput.value = "";
}

// Delete button functionality
function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach((btn) => {
        btn.onclick = function () {
            this.parentNode.remove();
            updateScrollState();   // << FIXED missing part
        };
    });
}

// Checkbox check / uncheck
function updateTask(checkbox) {
    const taskItem = checkbox.parentElement.querySelector("p");

    if (checkbox.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}

// Handle scrollbar based on task count
function updateScrollState() {
    if (taskSection.offsetHeight >= 300) {
        taskSection.classList.add("overflow");
    } else {
        taskSection.classList.remove("overflow");
    }
}
