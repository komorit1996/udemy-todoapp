const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter task"],
            trim: true,
            maxlength: [20, "Task Max Length is 20"]
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model("Task", TaskSchema);
