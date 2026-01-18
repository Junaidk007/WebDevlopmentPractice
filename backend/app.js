const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Students = require('./student');

const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/department').then(() => {
    console.log('database connected');
})

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.get('/hello', async (req,res) => {
    const students = await Students.find({});
    res.send(students);
})

app.listen(port, () => {
    console.log('server is live');
})