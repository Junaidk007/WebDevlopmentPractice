const express = require('express');
const app = express();
require('dotenv').config(); // configuring dotenv
const port = process.env.PORT || 3000;
const dbConnection = require('./Models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
dbConnection().catch(err => console.log("❌ Database connection error:", err));
const authRouter = require('./Routes/authRouter.js')

// middlewares

app.use(cors());
app.use(express.json());

// routes

app.use('/auth', authRouter);

app.listen(port, () => console.log(`server is running on port ${port}`));