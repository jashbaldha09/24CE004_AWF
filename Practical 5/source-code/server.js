const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const globalErrorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(requestLogger);

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

app.use(globalErrorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - Student: Jash Baldha (24CE004)`);
  });
}).catch((err) => {
  console.error("Failed to start server due to database connection error.");
});
