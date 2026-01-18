const express = require('express');
require('dotenv').config();
const taskRouter = require('./routes/taskRoute.js')
const authRouter = require('./routes/authRoute.js')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/task', taskRouter);
app.use('/api/auth', authRouter);


module.exports = app;