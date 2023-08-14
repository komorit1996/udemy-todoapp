document.addEventListener("DOMContentLoaded", () => {
    const formDOM = document.querySelector(".task-form");
    const taskInputDOM = document.querySelector(".task-input");
    const tasksDom = document.querySelector(".tasks");
    const formAlertDOM = document.querySelector(".form-alert")

    // Function to show tasks
    const showTasks = async () => {
        try {
            const { data: tasks } = await axios.get("/api/v1/tasks");
            // if not found tasks.
            if (tasks.length === 0) {
                tasksDom.innerHTML = `<h5 class="empty-list">Not Found Task.</h5>`;
                return;
            };
            const allTasks = tasks.map((task) => {
                const { completed, _id, name } = task;
                return `<div class="single-task ${completed && "task-completed"}">
                    <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                    <div class="task-links">
                        <a href="edit.html?id=${_id}" class="edit-link">
                            <i class="fa fa-pen-square"></i>
                        </a>
                        <button type="button" class="delete-btn" data-id="${_id}">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`;
            });
            tasksDom.innerHTML = allTasks.join("");
        } catch (err) {
            console.log(err);
        }
    };

    showTasks();

    // create task
    formDOM.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            // Add task
            const name = taskInputDOM.value;
            await axios.post("/api/v1/tasks", { name: name });
            // display status
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = "ADD TO TASK.";
            formAlertDOM.classList.add("text-success");
            setTimeout(() => {
                formAlertDOM.style.display = "none";
                formAlertDOM.classList.remove("text-success");
            }, 3000);
            showTasks();
        } catch (err) {
            // display status from form.
            formAlertDOM.style.display = "block";
            formAlertDOM.innerHTML = "It is invalid.Please rewrite again.";
            setTimeout(() => {
                formAlertDOM.style.display = "none";
                formAlertDOM.classList.remove("text-success");
            }, 3000);
        }
    });

    // Task Delete
    tasksDom.addEventListener("click", async (event) => {
        const element = event.target;

        if (element.parentElement.classList.contains("delete-btn")) {
            try {
                // data-id="64d832960bc1e87a9c317302">
                const id = element.parentElement.dataset.id;
                await axios.delete(`/api/v1/tasks/${id}`);
                showTasks();
            } catch (err) {
                console.log(err)
            }
        }
    })
});
