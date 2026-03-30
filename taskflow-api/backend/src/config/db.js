const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect(process.env.AUTHDB);
    console.log('database is connected');
}

module.exports = dbConnection;