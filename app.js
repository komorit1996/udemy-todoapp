const express = require('express');
const app = express();
const taskRouter = require("./routers/tasks.js");
const connectDB = require("./DB/connect.js");
require("dotenv").config();
const PORT = 8080;

// app setting
app.use(express.json());
app.use(express.static("./public"));

// route
app.use("/api/v1/tasks", taskRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log("launch server !!! : http://localhost:8080 http://localhost:8080/api/v1/tasks"));
    } catch (err) {
        console.log(err);
    }
};

start();
