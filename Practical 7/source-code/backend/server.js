require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Pipeline]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

let serverInstance = null;

const startServer = async () => {
  await connectDB();
  return new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Practical 7 Server running on port ${PORT} - Student: Jashkumar Baldha (24CE004)`);
      resolve(serverInstance);
    });
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
