const express = require('express');
const requestLogger = require('./middleware/logger');
const globalErrorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(requestLogger);

app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - Student: Jash Baldha (24CE004)`);
});
