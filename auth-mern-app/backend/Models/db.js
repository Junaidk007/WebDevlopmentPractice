const mongoose = require('mongoose');

let dbConnection = async () => {
    await mongoose.connect(process.env.AUTHDB);
    console.log('database connecton is successful');
}

module.exports = dbConnection;