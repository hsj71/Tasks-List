const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");
const themeToggle = document.getElementById("theme-toggle");

/* -----------------------------------------------------
   DARK MODE
----------------------------------------------------- */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerText = "☀️ Light Mode";
}

themeToggle.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
};


/* -----------------------------------------------------
   CREATE TASK
----------------------------------------------------- */
document.querySelector("#push").onclick = createTask;
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") createTask();
});

function createTask() {
    if (!taskInput.value.trim()) {
        alert("Enter a task.");
        return;
    }

    taskSection.innerHTML += `
        <div class="task">
            <label>
                <input type="checkbox" class="check">
                <p>${taskInput.value}</p>
            </label>
            <div class="edit"><i class="uil uil-edit"></i></div>
            <div class="delete"><i class="uil uil-trash"></i></div>
        </div>
    `;

    taskInput.value = "";
    restoreEvents();
    saveTasks();
}

/* -----------------------------------------------------
   RESTORE EVENTS (after loading or adding tasks)
----------------------------------------------------- */
function restoreEvents() {
    // DELETE
    document.querySelectorAll(".delete").forEach(btn => {
        btn.onclick = function () {
            this.parentNode.remove();
            saveTasks();
        };
    });

    // CHECKBOX
    document.querySelectorAll(".check").forEach(chk => {
        chk.onchange = function () {
            const p = this.parentNode.querySelector("p");
            if (this.checked) p.classList.add("checked");
            else p.classList.remove("checked");
            saveTasks();
        };
    });

    // EDIT TASK
    document.querySelectorAll(".edit").forEach(editBtn => {
        editBtn.onclick = function () {
            const p = this.parentNode.querySelector("p");
            const newText = prompt("Edit task:", p.innerText);

            if (newText !== null && newText.trim() !== "") {
                p.innerText = newText;
                saveTasks();
            }
        };
    });
}
