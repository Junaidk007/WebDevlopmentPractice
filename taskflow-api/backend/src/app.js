const express = require('express');
const taskRouter = require('./routes/taskRoute.js');
const authRouter = require('./routes/authRoute.js');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', taskRouter);
app.use('/api/auth', authRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow API is running'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorHandler);

module.exports = app;
