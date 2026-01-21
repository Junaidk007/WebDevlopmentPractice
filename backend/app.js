const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Students = require('./student');

const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/department').then(() => {
    console.log('database connected');
})

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.post('/hello', async (req,res) => {
    const {name, email} = req.body;
    res.json({message: `Hello, ${name}! Your email is ${email}.`});
})

app.listen(port, () => {
    console.log('server is live');
})