const params = window.location;
const id = new URLSearchParams(params.search).get("id");
// html
const editId = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFromDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const showTask = async () => {
    try {
        const task = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task.data;
        // display
        editId.textContent = _id;
        taskNameDOM.value = name;
        taskCompletedDOM.checked = completed;
    } catch (err) {
        console.log(err);
    }
}

// show task
(async () => {
    await showTask(); // `showTask()` の非同期処理が完了するのを待つ
    // ここで他の処理を行う
})();

// edit task
editFromDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        // initial value
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        console.log(taskCompleted)
        const { data: task } = await axios.patch(
            `/api/v1/tasks/${id}`,
            { name: taskName, completed: taskCompleted }
        );
        // display status
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Succcses TO Edit Task.";
        formAlertDOM.classList.add("text-success");
        setTimeout(() => {
            formAlertDOM.style.display = "none";
            formAlertDOM.classList.remove("text-success");
        }, 3000);

    } catch (err) {
        console.log(err);
        // display status from form.
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "It is invalid.Please rewrite again.";
        setTimeout(() => {
            formAlertDOM.style.display = "none";
            formAlertDOM.classList.remove("text-success");
        }, 3000);
    }
});
