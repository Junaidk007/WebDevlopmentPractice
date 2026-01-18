const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: String,
    name: String,
    dob: String,
    department: String,
    skills: [String],
    attendance: Number
})

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;