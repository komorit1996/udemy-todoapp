const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks");

// router define
router.get("/", getAllTasks); // reach route does getAllTask.
router.get("/:id", getSingleTask); // Specific id
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
