const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskflow");
    console.log('database is connected');
}

module.exports = dbConnection;