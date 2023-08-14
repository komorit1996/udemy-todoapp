// module
const Task = require("../models/Task");

// GET Method
const getAllTasks = async (req, res) => {
    try {
        const getAllTasks = await Task.find({});
        res.status(200).json(getAllTasks);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const singleTask = await Task.findOne({ _id: req.params.id });
        if (!singleTask) {
            return res.status(404).json({ error: `Task not found : ${req.params.id}` });
        }
        res.status(200).json(singleTask);
    } catch (err) {
        console.error("Error fetching single task:", err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
};

// Create Task
const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updateTask) {
            return res.status(404).json({ error: `Task not found : ${req.params.id}` });
        }
        res.status(200).json(updateTask);
    } catch (err) {
        console.error("Error fetching single task:", err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
};

// delete task
const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.deleteOne(
            { _id: req.params.id }
        );
        if (!deleteTask) {
            return res.status(404).json({ error: `Task not found : ${req.params.id}` });
        }
        res.status(200).json(deleteTask);
    } catch (err) {
        console.error("Error fetching single task:", err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
};

// Exports
module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}
