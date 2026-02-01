const express = require('express');
const taskRouter = require('./routes/taskRoute.js')
const authRouter = require('./routes/authRoute.js')
const errorHandler = require('./middleware/errorHandler.js');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', taskRouter);
app.use('/api/auth', authRouter);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found"
  });
});
app.use(errorHandler);


module.exports = app;