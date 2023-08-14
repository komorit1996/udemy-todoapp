// getting-started.js
const mongoose = require('mongoose');

// Pass the connection string
const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log("Connecting Database..."))
    .catch((err) => console.log(err))
};

module.exports = connectDB;
