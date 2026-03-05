const express = require('express');
const taskRouter = require('./routes/taskRoute.js');
const authRouter = require('./routes/authRoute.js');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors');

const app = express();

// CORS setup for both local development and VS Code dev tunnels.
// You can still override by setting FRONTEND_URL in .env (comma-separated supported).
const localOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...localOrigins, ...envOrigins])];

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (Postman/curl) that may not send Origin.
    if (!origin) {
      return callback(null, true);
    }

    // Allow explicit local/env origins.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow VS Code Dev Tunnel frontend URLs.
    if (origin.endsWith('.devtunnels.ms')) {
      return callback(null, true);
    }

    return callback(new Error('CORS: Origin not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Task routes are protected by token middleware in each route.
app.use('/api', taskRouter);

// Auth routes are public.
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorHandler);

module.exports = app;
